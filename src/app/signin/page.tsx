"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
// import { toast } from 'react-toastify';

const SignInPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {
          email: string;
          password: string;
        };
        console.log(user);
    
        const { data, error } = await authClient.signIn.email({
          ...user,
        });
    
        if (data) {
        //   toast.success("Sign in successfully");
          redirect("/");
        }
        if (error) {
        //   toast.error(error.message);
        }
      };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <br />
                <input name="email" type="email" />
                <br />
                <label>Password</label>
                <br />
                <input type="password" name="password" id="" />
                <br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;