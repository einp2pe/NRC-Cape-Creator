import type { SVGProps } from "react";

export function CapeFrontIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7.5 10.5h9L18 21H6l1.5-10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 10.5V21" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
