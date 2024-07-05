import {
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { auth } from "../firebase";

import { IoMdPerson } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { toast } from "react-toastify";

const Navbar = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        toast("Logged out successfully");
      })
      .catch((error) => console.log(error));
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    if (user) {
      // Update the user's profile with the display name
      updateProfile(user, { displayName: displayName })
        .then(() => {
          console.log("Profile updated successfully");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });

      // Update the user's email
      updateEmail(user, email)
        .then(() => {
          console.log("Email updated successfully");
        })
        .catch((error) => {
          console.error("Error updating email:", error);
        });

      // Update the user's password if it is provided
      if (password) {
        updatePassword(user, password)
          .then(() => {
            console.log("Password updated successfully");
          })
          .catch((error) => {
            console.error("Error updating password:", error);
          });
      }
      setShowModal(false);
      toast("Account updated successfully");
      setShowDropdown(false);
    }
  };

  return (
    <nav className="fixed h-auto top-0 left-0 px-4 flex items-center justify-between min-h-14 w-screen bg-[#04962f] text-white font-semibold shadow-md">
      <Link className="m-4" to="/dashboard">
        Pakistan&apos;s Virtual Internship Platform
      </Link>
      {authUser ? (
        <div className=" flex items-center justify-center">
          <div className="relative">
            <button
              className="flex items-center justify-center text-gray-200 hover:text-white"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <IoMdPerson className="text-2xl m-2" />
              {authUser?.displayName || authUser?.email}
              <FaAngleDown className="text-xl m-2" />
            </button>

            {showDropdown && (
              <div className="absolute flex flex-col items-start justify-center right-0 text-md font-semibold mt-2 w-44 bg-white rounded-md shadow-lg py-2 z-20">
                <button
                  onClick={handleUpdateProfile}
                  className="flex items-center w-full   px-2 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <IoIosSettings className=" mr-2" />
                  Manage Account
                </button>
                <button
                  onClick={userSignOut}
                  className="flex items-center  w-full px-2 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <MdPowerSettingsNew className="mr-2" />
                  Log Out
                </button>
              </div>
            )}

            {showModal && (
              <div className="fixed inset-0 text-black bg-gray-600  bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white shadow-lg  border-gray-800 border-solid p-6 rounded-md w-96">
                  <h2 className="text-xl font-semibold mb-4">Manage Account</h2>
                  <hr />
                  <div className="my-4">
                    <label className="block mb-2 text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="my-4">
                    <label className="block mb-2 text-gray-700">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#04962f] text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <Link className="m-4" to="/signin">
            Sign In
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
