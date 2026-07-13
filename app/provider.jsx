// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import CustomCursor from "./components/CustomCursor";

export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <CustomCursor />
      <SmoothScroll>
        <PageTransition>{children}</PageTransition>
      </SmoothScroll>
    </HeroUIProvider>
  );
}