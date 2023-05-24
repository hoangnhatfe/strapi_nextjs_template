"use client";
import { AnimatePresence as _AnimatePresence } from "framer-motion";
import React from "react";

export default function AnimatePresence({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <_AnimatePresence
      mode="wait"
      onExitComplete={() => console.log("Animation Finished")}
    >
      {children}
    </_AnimatePresence>
  );
}