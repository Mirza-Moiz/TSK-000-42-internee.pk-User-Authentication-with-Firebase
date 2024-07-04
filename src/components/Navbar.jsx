import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";

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
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="fixed top-0 left-0 flex items-center justify-center h-11 w-screen bg-white shadow-md">
      {authUser ? (
        <>
          <Link className="m-4" to="/dashboard">
            Dashboard
          </Link>
          <button className="m-4" onClick={userSignOut}>
            Sign Out
          </button>
        </>
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
