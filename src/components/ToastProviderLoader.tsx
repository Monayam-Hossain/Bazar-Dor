// components/ToastProviderLoader.tsx
"use client";

import dynamic from "next/dynamic";

const ToastProvider = dynamic(() => import("./ToastProvider"), { ssr: false });

export default function ToastProviderLoader() {
  return <ToastProvider />;
}