import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Film, Star, Users, Globe } from "lucide-react";

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
    className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="mb-4 h-12 w-12 text-blue-500" />
    <h2 className="mb-2 text-xl font-semibold">{title}</h2>
    <p className="text-center text-gray-600">{description}</p>
  </motion.div>
);

export default function About() {
  return (
    <>
      <Head>
        <title>About MovieShop - Your Ultimate Movie Destination</title>
        <meta
          name="description"
          content="Learn about MovieShop, your one-stop destination for all things movies. Discover our passion for films and commitment to enhancing your movie-watching experience."
        />
      </Head>
      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold">About MovieShop</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Welcome to MovieShop, where passion for cinema meets convenience.
            We&apos;re dedicated to enhancing your movie-watching experience
            with the latest information, reviews, and a vast collection of
            films.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <AboutSection
            icon={Film}
            title="Vast Collection"
            description="Access thousands of movies across all genres, from classics to the latest releases."
          />
          <AboutSection
            icon={Star}
            title="Expert Reviews"
            description="Get insights from our team of film enthusiasts to help you choose your next watch."
          />
          <AboutSection
            icon={Users}
            title="Community"
            description="Join discussions, share recommendations, and connect with fellow movie lovers."
          />
          <AboutSection
            icon={Globe}
            title="Accessibility"
            description="Enjoy movies anytime, anywhere with our user-friendly platform and mobile app."
          />
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-semibold">Our Mission</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            At MovieShop, we&apos;re on a mission to make your movie-watching
            experience not just enjoyable, but extraordinary. Whether
            you&apos;re a seasoned cinephile or just looking for a great flick
            to unwind, we&apos;re here to guide you through the wonderful world
            of cinema.
          </p>
        </motion.section>
      </main>
    </>
  );
}
