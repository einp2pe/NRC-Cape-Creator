import { useCallback, useEffect, useRef, useState } from "react";

import * as skinview3d from "skinview3d";

import { Checkbox } from "@/components/Checkbox/Checkbox";
import { GhostButton } from "@/components/GhostButton/GhostButton";
import { SpinnerIcon } from "@/icons/SpinnerIcon";
import { UploadIcon } from "@/icons/UploadIcon";
import { resolveSkinUrl, SkinLookupError } from "@/utils/mojang";

import styles from "./CapePreview3D.module.scss";

const DEFAULT_SKIN_URL =
  "https://textures.minecraft.net/texture/31f477eb1a7beee631c2ca64d06f8f68fa93a3386d04452ab27f43acdf1b60cb";

type CapePreview3DProps = {
  capeTexture: string | null;
};

export const CapePreview3D = ({ capeTexture }: CapePreview3DProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<skinview3d.SkinViewer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [viewerReady, setViewerReady] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showElytra, setShowElytra] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const viewer = new skinview3d.SkinViewer({
      canvas: document.createElement("canvas"),
      width: stage.clientWidth || 300,
      height: stage.clientHeight || 400,
      skin: DEFAULT_SKIN_URL,
    });

    viewer.controls.enableRotate = true;
    viewer.controls.enableZoom = true;
    viewer.controls.enablePan = false;
    viewer.camera.position.set(0, 0, -50);
    viewer.camera.lookAt(0, 0, 0);
    viewer.animation = new skinview3d.IdleAnimation();

    stage.appendChild(viewer.canvas);
    viewerRef.current = viewer;
    setViewerReady(true);

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) viewer.setSize(width, height);
    });
    observer.observe(stage);

    return () => {
      observer.disconnect();
      viewer.dispose();
      viewer.canvas.remove();
      viewerRef.current = null;
      setViewerReady(false);
    };
  }, []);

  useEffect(() => {
    if (!viewerReady || !capeTexture) return;

    void viewerRef.current?.loadCape(capeTexture, {
      backEquipment: showElytra ? "elytra" : "cape",
    });
  }, [viewerReady, capeTexture, showElytra]);

  const handleUsernameSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const name = username.trim();
      const viewer = viewerRef.current;
      if (!name || !viewer) return;

      setLoading(true);
      setError(null);

      try {
        await viewer.loadSkin(await resolveSkinUrl(name));
      } catch (cause) {
        setError(
          cause instanceof SkinLookupError
            ? cause.message
            : "Could not load that skin"
        );
        await viewer.loadSkin(DEFAULT_SKIN_URL);
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const viewer = viewerRef.current;
    if (!file || !viewer) return;

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await viewer.loadSkin(reader.result as string);
        setUsername("");
      } catch {
        setError("That file isn't a valid skin");
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      setError("Could not read that file");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.viewer}>
      <div ref={stageRef} className={styles.stage} />

      <div className={styles.controls}>
        <Checkbox
          checked={showElytra}
          onChange={setShowElytra}
          label="Show as elytra"
        />

        <form
          className={styles.form}
          onSubmit={(e) => void handleUsernameSubmit(e)}
        >
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Minecraft username"
            aria-label="Minecraft username"
            disabled={loading}
          />
          <GhostButton type="submit" disabled={loading || !username.trim()}>
            {loading ? <SpinnerIcon className={styles.spinner} /> : "Load"}
          </GhostButton>
        </form>

        <GhostButton
          block
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
        >
          <UploadIcon />
          Upload skin
        </GhostButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png"
          className={styles.fileInput}
          onChange={handleFileChange}
        />

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
