import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { confirmPasswordReset } from 'firebase/auth'
import LoginImage from '../Images/LoginImage.png'
import { auth } from "../firebase";
const Home: NextPage = () => {
	const router = useRouter()
	const oobCode = router.query.oobCode as string
  
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')
  
	const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  console.log(process.env.chatgpt_api_key)

  const resetPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("The given passwords do not match.");
    } else if (newPassword === "" || confirmNewPassword === "") {
      setError("Please type in our new password.");
    } else {
      confirmPasswordReset(auth, oobCode, newPassword)
        .then(() => {
          setSuccess(
            "Password has been successfully changed. You can now login with your new password on the app."
          );
          setError("");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/weak-password") {
            setError("The given password is weak.");
          } else if (errorCode === "auth/internal-error") {
            setError(
              "There seems to be an internal server error. Try again later"
            );
          } else if (errorCode === "auth/invalid-action-code") {
            setError("This seems to be an invalid reset link.");
          }
          setNewPassword("");
          setConfirmNewPassword("");
        });
    }
  };
  return (
    <div
      className={
        "bg-gray-50 flex flex-col items-center justify-center h-screen"
      }
    >
      <Head>
        <title>Reset Password</title>
      </Head>
      {success.length > 0 && (
        <p
          className={`flex items-center absolute bg-emerald-500 font-bold text-white animate-pulse px-3 py-2 rounded-md text-md shadow-md top-5`}
        >
          {success}
        </p>
      )}
      {error && (
        <p
          className={`flex items-center absolute bg-red-400 text-white animate-bounce px-3 py-2 rounded-md text-md shadow-md top-5 right-5`}
        >
          <svg
            onClick={() => setError("")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-1 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          {error}
        </p>
      )}
      <div
        className={"bg-white p-10 shadow-md rounded-md border border-gray-200 "}
      >
        <Image src={LoginImage} alt={"LoginImage"} height={200} />

        <form className="flex flex-col mt-3">
          <input
            type={"password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={
              "outline-none shadow-sm bg-gray-50 text-sm px-4 py-2 border border-gray-200 rounded-md my-1 "
            }
            placeholder="New Password"
          />
          <input
            type={"password"}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className={
              "outline-none shadow-sm bg-gray-50 text-sm px-4 py-2 border border-gray-200 rounded-md my-1 "
            }
            placeholder="Confirm New Password"
          />
          <button
            type={"submit"}
            onClick={resetPassword}
            className={
              "p-2 text-lg text-white font-semibold bg-red-400 w-full mt-5 shadow-md rounded-md"
            }
          >
            <p>Reset Password</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home
