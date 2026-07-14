// app/providers.tsx
"use client";

import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import CustomCursor from "./components/CustomCursor";

export function Providers({ children }) {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <PageTransition>{children}</PageTransition>
      </SmoothScroll>
    </>
  );
}