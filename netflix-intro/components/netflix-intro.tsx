"use client"

import { useState, useEffect } from "react"
import "./netflix-intro.css"

type Letter = "N" | "E" | "T" | "F" | "L" | "I" | "X"

const LETTERS: Letter[] = ["N", "E", "T", "F", "L", "I", "X"]

export default function NetflixIntro() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (!isAnimating) return

    const timer = setTimeout(() => {
      if (currentLetterIndex < LETTERS.length - 1) {
        setCurrentLetterIndex(currentLetterIndex + 1)
      } else {
        setIsAnimating(false)
      }
    }, 4000) // Each letter animates for 4 seconds

    return () => clearTimeout(timer)
  }, [currentLetterIndex, isAnimating])

  const currentLetter = LETTERS[currentLetterIndex]

  return (
    <div className="netflix-container">
      <div className="netflix-intro" data-letter={currentLetter} key={currentLetter}>
        {/* Helper 1 - Main vertical bar with lights */}
        <div className="helper-1">
          <div className="effect-brush">
            {Array.from({ length: 31 }, (_, i) => (
              <span key={i} className={`fur-${31 - i}`} />
            ))}
          </div>
          <div className="effect-lumieres">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className={`lamp-${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Helper 2 - Secondary bar */}
        <div className="helper-2">
          <div className="effect-brush">
            {Array.from({ length: 31 }, (_, i) => (
              <span key={i} className={`fur-${31 - i}`} />
            ))}
          </div>
        </div>

        {/* Helper 3 - Tertiary bar */}
        <div className="helper-3">
          <div className="effect-brush">
            {Array.from({ length: 31 }, (_, i) => (
              <span key={i} className={`fur-${31 - i}`} />
            ))}
          </div>
        </div>

        {/* Helper 4 - Quaternary bar */}
        <div className="helper-4">
          <div className="effect-brush">
            {Array.from({ length: 31 }, (_, i) => (
              <span key={i} className={`fur-${31 - i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
