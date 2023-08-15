"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ImageComponent from "@/components/Image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { UploadImage } from "@/components/uploadImage";
import { configIp } from "./serverIp";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const [userdata, setUserData] = useState("");

  const { data, mutate, error, isLoading } = useSWR(
    `${configIp}/image/All`,
    fetcher
  );

  // let userdata = JSON.parse(localStorage.getItem("userData"));
  const router = useRouter();
  // if (!userdata) {
  //   router.push("/login");
  // }

  const reversedData = data ? [...data].reverse() : [];

  const checkifliked = (item) => {
    const liked = item.likedBy.includes(userdata?.user?._id);
    return liked;
  };
  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem("userData"));
    setUserData(userdata);
    if (!userdata) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <UploadImage mutate={mutate} userdata={userdata} />
      <div className={styles.blog_container}>
        {data?.length == 0 ? (
          <div className={styles.center}>
            <h2>No Post</h2>
          </div>
        ) : (
          reversedData?.map((item, index) => {
            const liked = checkifliked(item);
            return (
              <ImageComponent
                item={item}
                key={index}
                mutate={mutate}
                liked={liked}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
