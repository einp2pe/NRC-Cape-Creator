import { useEffect } from "react";

import { createPortal } from "react-dom";

import {
  categoryLabels,
  categoryOrder,
  templates,
  type CapeTemplate,
} from "@/data/templates";
import type { TemplateScope } from "@/hooks/useCapeState";
import { CloseIcon } from "@/icons/CloseIcon";
import { toCssGradient } from "@/utils/gradient";

import styles from "./TemplateGallery.module.scss";

const SCOPE_HINTS: Record<TemplateScope, string> = {
  both: "Applies to the cape and the elytra",
  main: "Applies to the cape",
  elytra: "Applies to the elytra",
};

type TemplateGalleryProps = {
  scope: TemplateScope;
  onSelectTemplate: (template: CapeTemplate, scope: TemplateScope) => void;
  onClose: () => void;
};

export const TemplateGallery = ({
  scope,
  onSelectTemplate,
  onClose,
}: TemplateGalleryProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="template-gallery-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <h2 className={styles.title} id="template-gallery-title">
              Templates
            </h2>
            <p className={styles.subtitle}>{SCOPE_HINTS[scope]}</p>
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close templates"
          >
            <CloseIcon />
          </button>
        </header>

        <div className={styles.body}>
          {categoryOrder.map((category) => {
            const inCategory = templates.filter(
              (template) => template.category === category
            );
            if (inCategory.length === 0) return null;

            return (
              <section key={category} className={styles.category}>
                <h3 className={styles.categoryTitle}>
                  {categoryLabels[category]}
                </h3>
                <div className={styles.grid}>
                  {inCategory.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      className={styles.card}
                      onClick={() => onSelectTemplate(template, scope)}
                    >
                      <span
                        className={styles.cardPreview}
                        style={{
                          background: toCssGradient(
                            template.settings.gradientColors,
                            template.settings.gradDirection
                          ),
                        }}
                      />
                      <span className={styles.cardName}>{template.name}</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
};
