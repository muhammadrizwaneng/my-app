"use client";

import Image from "next/image";
import styles from "../../page.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Profile() {
  const selectUserInfo = (state: any) => state?.user;
  const userData = useSelector(selectUserInfo);
  const [userInfo, setuserInfo] = useState<any>("");


  useEffect(() => {
    setuserInfo(userData)
  }, [userData])
  return (
    <main className={styles.profileContainer}>
      <h1 className={styles.profileName}>{userInfo.first_name} {userInfo.last_name}'s Profile</h1>
      <div className={styles.profileImageContainer}>
        {/* <Image
          src={userData.images.profile_pic}
          alt="Profile Picture"
          width={100}
          height={100}
          className={styles.profileImage}
        /> */}
      </div>
      <div className={styles.profileInfoContainer}>
        <p className={styles.profileInfo}>
          Email: <span>{userInfo.email}</span>
        </p>
        <p className={styles.profileInfo}>
          Phone Number: <span>{userInfo.phoneNumber}</span>
        </p>
      </div>
    </main>
  );
}