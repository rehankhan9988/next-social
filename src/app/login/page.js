"use client";
import React, { useEffect, useState } from "react";
import styles from "../register/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { configIp } from "../serverIp";

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const password = e.target[1].value;
    try {
      let obj = {
        username: name,
        password: password,
      };
      const { data } = await axios.post(`${configIp}/user/login`, obj);

      localStorage.setItem("userData", JSON.stringify(data));
      data?.message && router?.push("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const callBuiltInapi = async () => {
    try {
      const { data } = await axios.get("api/");
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    callBuiltInapi();
  }, []);
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          required
          className={styles.input}
          name="name"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
          name="password"
        />
        <button className={styles.button}>Login</button>
      </form>
      {error && <h5 style={{ color: "red" }}>user not found</h5>}
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/register">
        Sign Up
      </Link>
      {/* <span onClick={() => router?.push("/register")}>Sign Up</span> */}
    </div>
  );
};

export default Page;
