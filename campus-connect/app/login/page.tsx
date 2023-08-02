"use client";
import { FormEvent, useRef } from "react";
import { signIn } from "next-auth/react";

function page() {
  const email = useRef("");
  const password = useRef("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div>
        <form
          className="bg-white p-8 rounded-xl shadow"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl mb-8 font-semibold">Login</h1>
          <label>
            Email
            <input
              type="email"
              name="email"
              onChange={(event) => (email.current = event.target.value)}
              className="block border outline-none border-black rounded-lg px-4 py-2 bg-slate-50 mb-4"
              size={40}
              placeholder="Email"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={(event) => (password.current = event.target.value)}
              className="block border outline-none border-black rounded-lg px-4 py-2 bg-slate-50 mb-4"
              size={40}
              placeholder="Password"
              required
            />
          </label>
          <button
            type="submit"
            className="font-semibold w-full bg-blue-500 rounded-lg py-2 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
