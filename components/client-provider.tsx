"use client"

import type React from "react"

import { useScrollToHash } from "@/hooks/use-scroll"

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  // This component handles scroll to hash on initial load
  useScrollToHash()

  return <>{children}</>
}
