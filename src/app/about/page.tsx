"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Star, Users, Globe, Heart, Award, Zap } from "lucide-react";

const AboutSection = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl"
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-linear-to-br from-blue-100 to-purple-100 opacity-50 blur-2xl transition-transform duration-300 group-hover:scale-150" />
    <div className="relative">
      <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-purple-600 p-4 shadow-lg">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h2 className="mb-3 text-xl font-bold text-gray-900">{title}</h2>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  </motion.div>
);

export default function AboutPage() {
  return (
    <div className="animate-slide-up container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-16 overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-16 text-center text-white shadow-2xl"
      >
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
            <Heart className="h-5 w-5 fill-white" />
            <span className="font-semibold">Made with passion for cinema</span>
          </div>
          <h1 className="mb-6 text-5xl font-extrabold md:text-6xl">
            About MovieShop
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-blue-100">
            Welcome to MovieShop, where passion for cinema meets convenience.
            We&apos;re dedicated to enhancing your movie-watching experience
            with the latest information, reviews, and a vast collection of
            films.
          </p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AboutSection
          icon={Film}
          title="Vast Collection"
          description="Access thousands of movies across all genres, from classics to the latest releases."
        />
        <AboutSection
          icon={Star}
          title="Expert Curation"
          description="Handpicked selections and ratings to help you discover your next favorite film."
        />
        <AboutSection
          icon={Users}
          title="Community"
          description="Join discussions, share recommendations, and connect with fellow movie lovers."
        />
        <AboutSection
          icon={Globe}
          title="Accessibility"
          description="Enjoy movies anytime, anywhere with our user-friendly platform."
        />
      </div>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-16 overflow-hidden rounded-3xl bg-white p-12 shadow-xl ring-1 ring-black/5"
      >
        <div className="text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-purple-100 p-4">
            <Award className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="mb-6 text-4xl font-extrabold text-gray-900">
            Our Mission
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            At MovieShop, we&apos;re on a mission to make your movie-watching
            experience not just enjoyable, but extraordinary. Whether
            you&apos;re a seasoned cinephile or just looking for a great flick
            to unwind, we&apos;re here to guide you through the wonderful world
            of cinema.
          </p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 p-8 text-center text-white shadow-xl"
        >
          <Zap className="mx-auto mb-4 h-12 w-12" />
          <div className="mb-2 text-4xl font-extrabold">100+</div>
          <div className="text-blue-100">Movies Available</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="rounded-2xl bg-linear-to-br from-purple-600 to-pink-600 p-8 text-center text-white shadow-xl"
        >
          <Star className="mx-auto mb-4 h-12 w-12 fill-white" />
          <div className="mb-2 text-4xl font-extrabold">HD</div>
          <div className="text-purple-100">Quality Streaming</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="rounded-2xl bg-linear-to-br from-pink-600 to-red-600 p-8 text-center text-white shadow-xl"
        >
          <Heart className="mx-auto mb-4 h-12 w-12 fill-white" />
          <div className="mb-2 text-4xl font-extrabold">24/7</div>
          <div className="text-pink-100">Always Available</div>
        </motion.div>
      </div>
    </div>
  );
}
