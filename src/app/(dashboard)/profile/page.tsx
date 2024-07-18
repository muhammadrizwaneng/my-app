"use client";

import Image from "next/image";
import styles from "../../page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";

export default function Profile() {
  const selectUserInfo = (state: any) => state?.user;
  const userData = useSelector(selectUserInfo);
  const [userInfo, setuserInfo] = useState<any>("");

console.log("-=-==--=userData",userData)
const router = useRouter();

const dispatch = useDispatch()

  useEffect(() => {
    if(!userData){
      router.push("/login")
    } else {
      setuserInfo(userData)
    }
  }, [userData])

  const handleLogout = ()=>{
    dispatch(logout())
    
  }
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
      <div>
        <a onClick={handleLogout}>Logout</a>
      </div>
    </main>
  );
}