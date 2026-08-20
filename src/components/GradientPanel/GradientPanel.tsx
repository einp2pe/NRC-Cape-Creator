import { Checkbox } from "@/components/Checkbox/Checkbox";
import { GradientEditor } from "@/components/GradientEditor/GradientEditor";
import type { GradientDirection } from "@/data/templates";
import type { TemplateScope } from "@/hooks/useCapeState";

import styles from "./GradientPanel.module.scss";

type GradientPanelProps = {
  gradientColors: string[];
  gradDirection: GradientDirection;
  onGradientColorsChange: (colors: string[]) => void;
  onGradDirectionChange: (direction: GradientDirection) => void;

  separateElytraGradient: boolean;
  onSeparateElytraGradientChange: (separate: boolean) => void;
  elytraGradientColors: string[] | null;
  onElytraGradientColorsChange: (colors: string[]) => void;
  elytraGradDirection: GradientDirection;
  onElytraGradDirectionChange: (direction: GradientDirection) => void;

  onBrowseTemplates: (scope: TemplateScope) => void;
};

export const GradientPanel = ({
  gradientColors,
  gradDirection,
  onGradientColorsChange,
  onGradDirectionChange,
  separateElytraGradient,
  onSeparateElytraGradientChange,
  elytraGradientColors,
  onElytraGradientColorsChange,
  elytraGradDirection,
  onElytraGradDirectionChange,
  onBrowseTemplates,
}: GradientPanelProps) => (
  <section className={styles.panel} aria-label="Gradient">
    <GradientEditor
      title="Cape gradient"
      directionLabel="Direction"
      colors={gradientColors}
      direction={gradDirection}
      onColorsChange={onGradientColorsChange}
      onDirectionChange={onGradDirectionChange}
      onBrowseTemplates={() => onBrowseTemplates("main")}
    />

    <div className={styles.divider} />

    <Checkbox
      checked={separateElytraGradient}
      onChange={onSeparateElytraGradientChange}
      label="Give the elytra its own gradient"
    />

    {separateElytraGradient && (
      <GradientEditor
        title="Elytra gradient"
        directionLabel="Elytra direction"
        colors={elytraGradientColors ?? gradientColors}
        direction={elytraGradDirection}
        onColorsChange={onElytraGradientColorsChange}
        onDirectionChange={onElytraGradDirectionChange}
        onBrowseTemplates={() => onBrowseTemplates("elytra")}
      />
    )}
  </section>
);
