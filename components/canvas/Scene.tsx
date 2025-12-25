"use client";

import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Scene({ children, className, ...props }: any) {
  return (
    <div
      className={
        className ||
        "fixed top-0 left-0 w-full h-[100dvh] -z-10 pointer-events-none"
      }
    >
      <Canvas {...props} dpr={[1, 1.5]}>
        {children}
        <Preload all />
      </Canvas>
    </div>
  );
}
