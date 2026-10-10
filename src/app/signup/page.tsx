"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
// import { toast } from 'react-toastify';

const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };
    console.log(user);

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
    //   toast.success("Sign up successfully");
      redirect("/");
    }
    if (error) {
      console.log(error);
    //   toast.error(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <br />
        <input name="name" type="text" id="" placeholder="Name" />
        <br />
        <label>Image</label>
        <br />
        <input name="image" type="url" id="" placeholder="Image" />
        <br />
        <label>Email</label>
        <br />
        <input name="email" type="email" id="" />
        <br />
        <label>Password</label>
        <br />
        <input name="password" type="password" id="" />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
