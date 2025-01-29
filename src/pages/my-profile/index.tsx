import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Edit2, Mail, Phone, Camera } from "lucide-react";
import { useSession, getSession } from "next-auth/react";
import type { GetServerSideProps } from "next";

const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB

export default function MyProfile() {
  const { data: sessionData } = useSession();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (sessionData) {
      const { name, email = "", image } = sessionData.user;
      const [firstName = "", lastName = ""] = (name ?? "").split(" ");
      setUserData({
        firstName,
        lastName,
        email: email ?? "",
        phoneNumber: "123-456-7890", // Default phone number, update as needed
        profilePicture: image ?? "",
      });
    }
  }, [sessionData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        alert("Image size should be less than 1MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUserData((prevUserData) => ({
          ...prevUserData,
          profilePicture: result,
        }));
        try {
          localStorage.setItem("userProfileImage", result);
        } catch (error) {
          console.error("Error saving image to localStorage:", error);
          alert("Failed to save image. It might be too large.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-8"
    >
      <h1 className="mb-8 text-center text-3xl font-bold">My Profile</h1>
      <div className="mx-auto max-w-2xl overflow-hidden rounded-lg p-4 shadow-md">
        <div className="md:flex">
          <div className="md:shrink-0">
            <div className="relative h-48 w-full md:w-48">
              <Image
                src={
                  userData.profilePicture?.startsWith("http")
                    ? userData.profilePicture
                    : "/imgs/image-not-found.jpg"
                }
                alt="Profile"
                width={180}
                height={180}
                priority
                className="rounded-full object-cover"
              />
              <label
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-500 p-2 text-white"
              >
                <Camera size={20} />
                <input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  title="Upload Profile Picture"
                />
              </label>
            </div>
          </div>
          <div className="p-8">
            <motion.div
              className="text-sm font-semibold uppercase tracking-wide text-blue-500"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              MovieShop Member
            </motion.div>
            <motion.h2
              className="mt-2 text-2xl font-semibold leading-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {userData.firstName} {userData.lastName}
            </motion.h2>
            <motion.div
              className="mt-4 text-gray-600"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="mb-2 flex items-center">
                <Mail className="mr-2" size={18} />
                {userData.email}
              </p>
              <p className="flex items-center">
                <Phone className="mr-2" size={18} />
                {userData.phoneNumber}
              </p>
            </motion.div>
          </div>
        </div>
        <div className="px-8 py-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
          >
            <Edit2 size={18} className="mr-2" />
            Edit Profile
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
