"use client";

import { LazyMotion, domAnimation } from "framer-motion";
export default function Template({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}