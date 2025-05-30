"use client"

import type React from "react"

import type { ReactNode } from "react"
import { scrollToSection } from "@/hooks/use-scroll"

interface ScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function ScrollLink({ href, children, className = "", onClick }: ScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Extract the ID from the href (remove the #)
    const id = href.replace("#", "")

    // Scroll to the section
    scrollToSection(id)

    // Call the additional onClick handler if provided
    if (onClick) {
      onClick()
    }

    // Update the URL without causing a page reload
    window.history.pushState({}, "", href)
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
