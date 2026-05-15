"use client";
import { useEffect, useRef } from "react";

export default function MouseBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const handleMouseMove = (e: MouseEvent) => {
      blob.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 0, fill: "forwards" }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 -z-[5]"
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "radial-gradient(circle, #f9ff40 0%, transparent 60%)",
        filter: "blur(60px)",
        top: "50%",
        left: "50%",
      }}
    />
  );
}