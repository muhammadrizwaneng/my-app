"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import the default styles
import styles from "../../page.module.css";

export default function Profile() {
  const selectUserInfo = (state: any) => state?.user;
  const userData = useSelector(selectUserInfo);
  const [userInfo, setUserInfo] = useState<any>(userData);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push("/login");
    } else {
      // Simulate data fetching
      // setTimeout(() => {
        setUserInfo(userData);
        setPreviewUrl(`https://res.cloudinary.com/dnrqj5cgh/image/upload/v1234567890/${userData.profilePicture}`);
        setIsLoading(false);
      // }, 1000); // Adjust the timeout as needed
    }
  }, [userData]);

  return (
    <main className={styles.profileContainer}>
      <h1 className={styles.profileName}>
        {isLoading ? (
          <Skeleton width={200} height={30} />
        ) : (
          `${userInfo.first_name} ${userInfo.last_name}'s Profile`
        )}
      </h1>
      <div className={styles.profileImageContainer}>
        {isLoading ? (
          <Skeleton circle={true} width={150} height={150} />
        ) : (
          previewUrl && (
            <img
              src={previewUrl}
              alt="Profile Picture"
              width={150}
              height={150}
              className={styles.profileImage}
            />
          )
        )}
      </div>
      <div className={styles.profileInfoContainer}>
        <p className={styles.profileInfo}>
          Email: {isLoading ? <Skeleton width={200} /> : <span>{userInfo.email}</span>}
        </p>
        <p className={styles.profileInfo}>
          Phone Number: {isLoading ? <Skeleton width={150} /> : <span>{userInfo.phoneNumber}</span>}
        </p>
      </div>

      <style jsx>{`
        .fileUploadContainer {
          margin-top: 20px;
        }
        .profileImage {
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
      `}</style>
    </main>
  );
}
