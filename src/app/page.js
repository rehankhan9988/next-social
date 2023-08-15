"use client";
import React from "react";
import styles from "./page.module.css";
import ImageComponent from "@/components/Image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { SERVER_IP } from "../../config";
import { UploadImage } from "@/components/uploadImage";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const { data, mutate, error, isLoading } = useSWR(
    `${SERVER_IP}/image/All`,
    fetcher
  );

  let userdata = JSON.parse(localStorage.getItem("userData"));
  const router = useRouter();
  if (!userdata) {
    router.push("/login");
  }

  const reversedData = data ? [...data].reverse() : [];

  const checkifliked = (item) => {
    const liked = item.likedBy.includes(userdata.user._id);
    return liked;
  };

  return (
    <>
      <UploadImage mutate={mutate} />
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
