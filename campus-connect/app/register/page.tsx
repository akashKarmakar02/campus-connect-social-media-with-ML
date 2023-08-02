"use client"

import { FormEvent } from "react"
import  { FaUser, FaCamera } from "react-icons/fa"

function page() {
  let first_name: string;
  let last_name: string;
  let email: string;
  let password: string;
  let profile_image: File;

  async function handleRegister(event: FormEvent) {
    event.preventDefault()
    const data = new FormData();
    
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("email", email);
    data.append("password", password);
    data.append("profile_image", profile_image);

    const response = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
      method: "POST",
      body: data
    });

    console.log(await response.json());
  }

  return (
    <div className="flex justify-center h-screen items-center">
        <div>
            <form className="bg-white p-8 rounded-xl shadow" onSubmit={handleRegister}>
                <h1 className="text-4xl mb-8 font-semibold">Register</h1>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="bg-slate-100 p-6 rounded-full">
                      <FaUser size={20} />
                    </div>
                    <div className="absolute flex flex-row items-end bottom-0 right-0">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div>
                          <FaCamera />
                        </div>
                        <input
                          type="file"
                          id="image-upload"
                          name="profile_image"
                          accept="image/*"
                          onChange={(event) => profile_image = event.target.files![0]}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <label htmlFor="first_name">First Name</label>
                <input type="text" onChange={(event) => first_name = event.target.value} className="bg-gray-50 border mb-4 border-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First Name" required/>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" onChange={(event) => last_name = event.target.value} className="bg-gray-50 border mb-4 border-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last Name" required/>
                <label>Email</label>
                <input type="text" onChange={(event) => email = event.target.value} className="block border border-black rounded-lg p-2.5 bg-slate-50 mb-4" size={40} placeholder="Email" required/>
                <label>Password</label>
                <input type="password" onChange={(event) => password = event.target.value} className="block border border-black rounded-lg p-2.5 bg-slate-50 mb-4" size={40} placeholder="Password" required/>
                <button type="submit" className="w-full text-white bg-blue-500 rounded-lg py-2">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default page