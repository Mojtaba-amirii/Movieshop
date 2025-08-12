import Link from "next/link";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Home,
  Film,
  Mail,
  Download,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function PaymentConfirmation() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti effect after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      {/* Background Sparkles */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        className="w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl"
          variants={itemVariants}
        >
          {/* Success Icon */}
          <motion.div className="mb-8 text-center" variants={itemVariants}>
            <motion.div
              className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center"
              variants={iconVariants}
            >
              <div className="absolute inset-0 animate-pulse rounded-full bg-green-100"></div>
              <CheckCircle className="relative h-16 w-16 text-green-500" />
            </motion.div>

            <motion.h1
              className="mb-4 text-4xl font-bold text-gray-900"
              variants={itemVariants}
            >
              Payment Successful!
            </motion.h1>

            <motion.p
              className="text-lg leading-relaxed text-gray-600"
              variants={itemVariants}
            >
              Thank you for your purchase! Your movies are now available in your
              library.
            </motion.p>
          </motion.div>

          {/* Confirmation Details */}
          <motion.div className="mb-8 space-y-4" variants={itemVariants}>
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <div className="mb-3 flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800">
                  Confirmation Sent
                </h3>
              </div>
              <p className="text-sm text-green-700">
                A confirmation email has been sent to your registered email
                address with your purchase details.
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <div className="mb-3 flex items-center gap-3">
                <Download className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Instant Access</h3>
              </div>
              <p className="text-sm text-blue-700">
                Your movies are ready to stream immediately. No downloads
                required!
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Link href="/my-movies" className="block w-full">
              <motion.button
                type="button"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Film className="h-5 w-5" />
                <span>Watch My Movies</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>

            <Link href="/" className="block w-full">
              <motion.button
                type="button"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gray-100 px-6 py-4 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="h-5 w-5" />
                <span>Continue Shopping</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Footer Message */}
          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-500">
              Thank you for choosing our movie streaming service!
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
