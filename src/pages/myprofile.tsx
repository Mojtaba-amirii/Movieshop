import React, { useState } from "react";
import Head from "next/head";

export default function Myprofile() {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    profilePicture: "/default-profile-picture1-300x300.jpg",
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData(
          (prevUserData) =>
            ({
              ...prevUserData,
              profilePicture: e.target?.result as string,
            }) as typeof prevUserData,
        );
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Head>
        <title>My Profile</title>
      </Head>
      <div className="container mx-auto mt-20 p-4">
        <div className="flex flex-col items-center rounded-lg bg-sky-200 p-6 shadow-md">
          <h1 className="mb-4 text-xl font-semibold">My Profile</h1>
          <div className="mb-4 flex  flex-col items-center gap-4">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="h-16 w-16 rounded-full"
            />
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-semibold">
                {userData.firstName} {userData.lastName}
              </p>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-gray-600">{userData.phoneNumber}</p>
              <input
                aria-label="inputImage"
                placeholder="Add Image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className=" w-40 text-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
