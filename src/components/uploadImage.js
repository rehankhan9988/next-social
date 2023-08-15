"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import styles from "../app/page.module.css";
import { useRouter } from "next/navigation";
import { configIp } from "@/app/serverIp";
export const UploadImage = ({ mutate, userdata }) => {
  const inputref = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("media", selectedFile);
      try {
        const response = await axios.post(
          `${configIp}/image/upload/${userdata?.user?._id}`,
          formData
        );

        setSelectedFile(null);
        inputref.current.value = "";
        mutate();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  return (
    <>
      <div className={styles.center}>
        <button style={{ padding: "10px", margin: "3%" }}>
          <input
            ref={inputref}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.uploadInput}
          />
        </button>
        <button
          style={{ padding: "10px", margin: "3%" }}
          onClick={() => {
            localStorage.removeItem("userData");
            router.push("/login");
          }}
        >
          Log Out
        </button>
      </div>
      <div className={styles.previewSection}>
        {selectedFile && (
          <>
            <div className={styles.previewImageContainer}>
              <h3>Selected Image:</h3>
              <img
                className={styles.previewImage}
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
              />
              <button
                className={styles.uploadButton}
                onClick={() => {
                  handleUpload();
                }}
              >
                Upload
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
