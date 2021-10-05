import { ReactNode } from "react";

export interface WithFallbackProps {
  fallback: () => ReactNode;
  shouldRenderFallback: boolean;
}