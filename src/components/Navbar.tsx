// Navbar.js]
"use client";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { BsCart } from "react-icons/bs";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [userFromLocal, setUserFromLocal] = useState();

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedValue = window.localStorage.getItem("user");
      if (storedValue) {
        const user: any = JSON.parse(storedValue);
        setUserFromLocal(user.data.user);
        setUserLoggedIn(true);
      }
    }
  }, [userLoggedIn]);

  const clickHandler = () => {
    router.push(`/cart/${userFromLocal}`);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUserLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link legacyBehavior href="/">
            <a id="link" className="text-white font-bold text-xl">
              E-Commerce
            </a>
          </Link>
        </div>
        <ul className=" flex space-x-4 ">
          <li className="flex items-center gap-2">
            {userLoggedIn ? (
              <>
                <BsCart color="white" />

                <a
                  id="link"
                  className="text-white hover:cursor-pointer"
                  onClick={clickHandler}
                >
                  Cart
                </a>
              </>
            ) : (
              ""
            )}
          </li>
          <li className="flex items-center gap-2">
            <FaUserCircle color="white" />
            {userLoggedIn ? (
              <Link legacyBehavior href="/">
                <a className="text-white" onClick={logoutHandler}>
                  Logout
                </a>
              </Link>
            ) : (
              <Link legacyBehavior href="/login">
                <a className="text-white">Login</a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
