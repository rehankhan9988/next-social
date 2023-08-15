"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const Register = () => {
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
      console.log("obj", obj);
      const { data } = await axios.post(
        `${process.env.API_KEY}/user/register`,
        obj
      );

      router?.push("/login");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          required
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Register</button>
      </form>
      {error && <h5 style={{ color: "red" }}>user already Exist</h5>}
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/login">
        Login with an existing account
      </Link>
    </div>
  );
};

export default Register;
