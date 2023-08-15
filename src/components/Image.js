import React, { useEffect, useState } from "react";
import styles from "../../src/app/page.module.css";
import axios from "axios";

const ImageComponent = ({ item, mutate, liked }) => {
  const comment = item?.comments;
  const [checked, setChecked] = useState(liked);
  const [value, setValue] = useState("");
  let data = JSON.parse(localStorage.getItem("userData"));
  const commentHandler = async () => {
    let obj = {
      userId: data.user._id,
      imageId: item._id,
      comment: value,
    };
    try {
      if (value) {
        const { data } = await axios.post(
          `${process.env.API_KEY}/image/commnet`,
          obj
        );
        mutate();
        setValue("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const like = async () => {
    try {
      let obj = { userId: data.user._id, imageId: item._id };
      await axios.post(`${process.env.API_KEY}/image/like`, obj);
      mutate();
      setChecked(true);
    } catch (error) {
      console.log("image like error", error);
    }
  };

  useEffect(() => {
    setChecked(liked);
  }, [liked]);
  return (
    <div className={styles.blog_post}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "4%",
        }}
      >
        <div
          style={{
            backgroundColor: "#DBC4F0",
            width: "50px",
            height: "50px",
            borderRadius: 50,
          }}
        >
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {item?.username?.charAt(0)?.toUpperCase()}
          </h3>
        </div>

        <h3 style={{ marginLeft: "2%" }}>{item?.username}</h3>
      </div>

      <img src={item.url} className={styles.blog_image} alt={item.title} />
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className={styles.heart} onClick={like}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 100 100"
            >
              <path
                d="M50 85.8c-1.5-1.7-28.1-30.7-28.1-44.7C21.9 21.9 34.5 9.4 50 22.2 65.5 9.4 78.1 21.9 78.1 41.1c0 14-26.6 43-28.1 44.7z"
                fill={checked ? "red" : "white"}
              />
            </svg>
          </div>
          <span style={{ marginLeft: "5px" }}>{item?.likesCount}</span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            style={{ width: "75%", padding: 10, borderRadius: 10 }}
          />
          <button
            onClick={() => commentHandler()}
            style={{ width: "20%", padding: 10, borderRadius: 10 }}
          >
            Comment
          </button>
        </div>
        <div style={{ marginTop: "3%" }}>
          {comment?.map((item, ind) => {
            return (
              <div
                key={ind}
                style={{
                  backgroundColor: "white",
                  marginTop: 6,
                  padding: 10,
                  width: "60%",
                  borderRadius: 10,
                }}
              >
                <h5>{item?.username}</h5>
                <h6> {item?.comment}</h6>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
