import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toast("Logged in successfully");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast("Invalid email or password");
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div
          className="flex flex-col m-4 items-center justify-center w-full max-w-sm rounded-lg bg-white shadow-lg p-4"
          style={{
            boxShadow: "rgb(0 0 0 / 10%) 0px 0px 20px 10px",
          }}
        >
          <img
            className="h-14 w-auto"
            src="./images/logo.png"
            alt="Internee.pk"
          />
          <form className="flex flex-col items-center  w-[100%] py-6 px-4">
            <h1 className="text-xl m-2">Log In</h1>
            <div className="mb-4 w-full">
              <input
                type="email"
                name="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity(
                    "Please enter a valid email address"
                  )
                }
                onInput={(e) => e.currentTarget.setCustomValidity("")}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="name@email.com"
              />
            </div>
            <div className="mb-4 w-full">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  name="remeber-me"
                  id=""
                  className="mr-2 leading-tight focus:outline-none focus:shadow-outline h-4 w-4"
                />
                <label
                  htmlFor="remeber-me"
                  className=" text-gray-500 font-semibold"
                >
                  Remember Me
                </label>
              </div>
              <button
                className="bg-[#04962f] hover:bg-[#32af57]  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all ease-in-out duration-150"
                type="button"
                disabled={!email || !password}
                onClick={submitHandler}
              >
                Sign In
              </button>
            </div>
            <Link
              className="inline-block align-baseline pt-4  text-md text-[#04962f] hover:text-[#32af57] transition-all ease-in-out duration-150"
              to="/signup"
            >
              <span className="text-black">Don&apos;t have an account? </span>
              Sign Up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
