"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Heart } from "lucide-react"
import photo from "../assets/photu.gif"

import photo2 from "../assets/photu2.gif"
const ValentinePage = () => {
  const [step, setStep] = useState("intro1")
  const [messageIndex, setMessageIndex] = useState(0)
  const [yesScale, setYesScale] = useState(1)

  const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️",
  ]

  useEffect(() => {
    if (step === "intro1") {
      const timer = setTimeout(() => setStep("intro2"), 2000)
      return () => clearTimeout(timer)
    }
    if (step === "intro2") {
      const timer = setTimeout(() => setStep("question"), 2000)
      return () => clearTimeout(timer)
    }
  }, [step])

  const handleNoClick = () => {
    setMessageIndex((prev) => (prev + 1) % messages.length)
    setYesScale((prev) => prev * 1.25)
  }

  const createHeartConfetti = () => {
    const end = Date.now() + 3 * 1000

    const colors = ["#ff69b4", "#ff1493", "#ff69b4"]
    ;(function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ["heart"],
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ["heart"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }

  const handleYesClick = () => {
    createHeartConfetti()
    setStep("yes")
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(255, 105, 180, 0.5)",
    },
    tap: { scale: 0.95 },
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-pink-100 to-white flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === "intro1" && (
          <motion.div
            key="intro1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-pink-500">"Divam you never write me poem"</h1>
          </motion.div>
        )}

        {step === "intro2" && (
          <motion.div
            key="intro2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-pink-500">So this is my way...</h1>
          </motion.div>
        )}

        {step === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-pink-500 mb-8"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              Will you be my Valentine?
            </motion.h1>

            <motion.div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <motion.button
                className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-8 py-4 rounded-full text-xl md:text-2xl shadow-lg transition-all duration-300 ease-in-out transform"
                style={{ scale: yesScale }}
                variants={buttonVariants}
                whileTap="tap"
                onClick={handleYesClick}
              >
                Yes
              </motion.button>

              <motion.button
                className="bg-gradient-to-r from-pink-200 to-pink-300 text-pink-700 px-8 py-4 rounded-full text-xl md:text-2xl shadow-lg transition-all duration-300 ease-in-out transform"
                variants={buttonVariants}
                whileTap="tap"
                onClick={handleNoClick}
              >
                {messageIndex === 0 ? "No" : messages[messageIndex]}
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <img
                src={photo2}
                alt="Cute Valentine GIF"
                className="max-w-xs mx-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        )}

        {step === "yes" && (
          <motion.div
            key="yes"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-pink-500 mb-8"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              Knew you would say yes! ❤️
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <img
                src={photo}
                alt="Celebration GIF"
                className="max-w-xs mx-auto rounded-lg shadow-lg"
              />
            </motion.div>

            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-2xl text-pink-600">Thank you for making me the happiest person! 💖</p>
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  >
                    <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ValentinePage

