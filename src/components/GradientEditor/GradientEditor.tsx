import { useState } from "react";

import { GhostButton } from "@/components/GhostButton/GhostButton";
import { SegmentedControl } from "@/components/SegmentedControl/SegmentedControl";
import type { GradientDirection } from "@/data/templates";
import { ArrowDownIcon } from "@/icons/ArrowDownIcon";
import { ArrowRightIcon } from "@/icons/ArrowRightIcon";
import { CloseIcon } from "@/icons/CloseIcon";
import { PlusIcon } from "@/icons/PlusIcon";
import { TemplatesIcon } from "@/icons/TemplatesIcon";
import { cn } from "@/lib/utils";
import { toCssGradient } from "@/utils/gradient";

import styles from "./GradientEditor.module.scss";

const DIRECTION_OPTIONS: {
  value: GradientDirection;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "vertical", label: "Vertical", icon: <ArrowDownIcon /> },
  { value: "horizontal", label: "Horizontal", icon: <ArrowRightIcon /> },
];

const move = (colors: string[], from: number, to: number) => {
  const next = [...colors];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

type GradientEditorProps = {
  title: string;
  directionLabel: string;
  colors: string[];
  direction: GradientDirection;
  onColorsChange: (colors: string[]) => void;
  onDirectionChange: (direction: GradientDirection) => void;
  onBrowseTemplates: () => void;
};

export const GradientEditor = ({
  title,
  directionLabel,
  colors,
  direction,
  onColorsChange,
  onDirectionChange,
  onBrowseTemplates,
}: GradientEditorProps) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const endDrag = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (to: number) => {
    if (dragIndex !== null && dragIndex !== to) {
      onColorsChange(move(colors, dragIndex, to));
    }
    endDrag();
  };

  const handleColorChange = (index: number, color: string) => {
    onColorsChange(colors.map((current, i) => (i === index ? color : current)));
  };

  return (
    <section className={styles.editor} aria-label={title}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <GhostButton size="sm" onClick={onBrowseTemplates}>
          <TemplatesIcon width={12} height={12} />
          Templates
        </GhostButton>
      </header>

      <div
        className={styles.preview}
        style={{ background: toCssGradient(colors, direction) }}
        aria-hidden="true"
      />

      <div className={styles.strip}>
        {colors.map((color, index) => (
          <div
            key={index}
            className={cn(
              styles.chip,
              dragIndex === index && styles.dragging,
              dragOverIndex === index && styles.dragOver
            )}
            draggable
            onDragStart={(event) => {
              setDragIndex(index);
              event.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              setDragOverIndex(index);
            }}
            onDragEnd={endDrag}
            onDrop={(event) => {
              event.preventDefault();
              handleDrop(index);
            }}
          >
            <input
              type="color"
              className={styles.swatch}
              value={color}
              onChange={(event) => handleColorChange(index, event.target.value)}
              aria-label={`Color ${index + 1}`}
            />
            {colors.length > 1 && (
              <button
                type="button"
                className={styles.chipRemove}
                onClick={() =>
                  onColorsChange(colors.filter((_, i) => i !== index))
                }
                aria-label={`Remove color ${index + 1}`}
              >
                <CloseIcon width={9} height={9} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className={styles.add}
          onClick={() => onColorsChange([...colors, "#ffffff"])}
          aria-label="Add color"
        >
          <PlusIcon width={14} height={14} />
        </button>
      </div>

      <SegmentedControl
        label={directionLabel}
        value={direction}
        options={DIRECTION_OPTIONS}
        onChange={onDirectionChange}
      />
    </section>
  );
};
