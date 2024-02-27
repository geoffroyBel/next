"use client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h1>Create New User</h1>
        <Input
          label="name"
          id="name"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        <Input
          label="email"
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          label="password"
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />

        <Button type="submit" color="primary">
          Register
        </Button>
      </form>
      <p className="text-red-500 text-xl"></p>
    </>
  );
}
