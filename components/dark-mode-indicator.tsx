"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DarkModeIndicator() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showIndicator, setShowIndicator] = useState(true)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Hide the indicator after 3 seconds
    const timer = setTimeout(() => {
      setShowIndicator(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg px-4 py-2 flex items-center gap-2 border border-gray-200 dark:border-gray-700">
            {theme === "dark" ? (
              <>
                <Moon className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Mode sombre activé</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Mode clair activé</span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
