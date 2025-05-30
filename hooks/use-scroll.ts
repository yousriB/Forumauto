"use client"

import { useEffect } from "react"

export function useScrollToHash() {
  useEffect(() => {
    // Function to handle smooth scrolling to hash
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        // Wait a bit for the DOM to be fully loaded
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }, 100)
      }
    }

    // Handle initial hash on page load
    handleHashChange()

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange)

    // Clean up
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}
