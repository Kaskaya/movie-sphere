import React, { useEffect, useRef } from "react";
import { MainContext } from "@/components/Context/context";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { genres } from "@/pages/api/api";
import Register from "@/components/Register";
import Login from "@/components/Login";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

function Header() {
  const router = useRouter();
  const { setActiveItem } = useContext<any>(MainContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);
  const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // SignInForm Visibility
  const handleCloseSignInForm = () => {
    setIsRegisterVisible(false);
    document.body.style.overflow = "auto";
  };
  const handleOpenSignInForm = () => {
    setIsRegisterVisible(true);
    document.body.style.overflow = "hidden";
  };

  // Login Form Visibility
  const handleOpenLoginForm = () => {
    setIsLoginVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseLoginForm = () => {
    setIsLoginVisible(false);
    document.body.style.overflow = "auto";
  };

  // Toggle Functionality
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Toggle Profile
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Sign Out Functionality
  const logout = async () => {
    try {
      await signOut(auth);
      /*   setIsUserLoggedIn(false); */
      window.location.href = router.asPath; // Redirect the page when user logs out
    } catch (error) {
      console.log(error);
    }
  };

  // Search Functionality
  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/search/movie/${searchTerm}`);
  };

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Update currentUser state when authentication state changes
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="flex justify-center  items-center h-16 sticky top-0 left-0 right-0 bg-slate-950 z-50  ">
      {/*  <h1 className="text-2xl m-2 text-center bg-red-500 p-2">
        Under Construction
      </h1> */}
      <div className="flex justify-center m-4  gap-8 items-center w-[1000px]">
        <div className="flex justify-center w-full  items-center">
          <Link key="2" className=" mr-4 " href="/">
            <svg
              width="180"
              height="28"
              viewBox="0 0 180 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.12 7H18.2C20.38 7 21.47 8.07 21.47 10.21V22H18.05C17.73 22 17.47 21.89 17.27 21.67C17.07 21.45 16.97 21.16 16.97 20.8V10.15C16.97 9.83 16.89 9.6 16.73 9.46C16.59 9.32 16.26 9.25 15.74 9.25H14.12V7ZM0.74 7H2.57C3.45 7 4.11 7.22 4.55 7.66C5.01 8.08 5.24 8.63 5.24 9.31V22H1.82C1.5 22 1.24 21.89 1.04 21.67C0.84 21.45 0.74 21.16 0.74 20.8V7ZM5.99 7H10.07C12.25 7 13.34 8.07 13.34 10.21V22H9.92C9.6 22 9.34 21.89 9.14 21.67C8.94 21.45 8.84 21.16 8.84 20.8V10.15C8.84 9.83 8.76 9.6 8.6 9.46C8.46 9.32 8.13 9.25 7.61 9.25H5.99V7ZM30.2206 7H33.1306C33.8906 7 34.5106 7.04 34.9906 7.12C35.4706 7.18 35.8906 7.33 36.2506 7.57C36.6106 7.81 36.8806 8.08 37.0606 8.38C37.2406 8.66 37.3806 9.12 37.4806 9.76C37.6406 10.66 37.7206 11.92 37.7206 13.54C37.7206 15.16 37.7106 16.26 37.6906 16.84C37.6706 17.4 37.6306 18 37.5706 18.64C37.5306 19.28 37.4406 19.75 37.3006 20.05C37.1806 20.35 37.0106 20.66 36.7906 20.98C36.5906 21.28 36.3206 21.49 35.9806 21.61C35.2406 21.87 34.2906 22 33.1306 22H33.0706V10.69C33.0706 10.65 33.0706 10.53 33.0706 10.33C33.0706 10.13 33.0606 9.96 33.0406 9.82C32.9406 9.44 32.5406 9.25 31.8406 9.25H30.2206V7ZM29.3206 7V18.31C29.3206 18.35 29.3206 18.47 29.3206 18.67C29.3206 18.87 29.3406 19.04 29.3806 19.18C29.4606 19.56 29.8506 19.75 30.5506 19.75H32.1706V22H29.2606C28.5006 22 27.8806 21.97 27.4006 21.91C26.9206 21.83 26.5006 21.67 26.1406 21.43C25.7806 21.19 25.5106 20.93 25.3306 20.65C25.1506 20.35 25.0006 19.88 24.8806 19.24C24.7406 18.34 24.6706 17.08 24.6706 15.46C24.6706 13.84 24.6806 12.75 24.7006 12.19C24.7206 11.61 24.7506 11 24.7906 10.36C24.8506 9.72 24.9406 9.25 25.0606 8.95C25.2006 8.65 25.3706 8.35 25.5706 8.05C25.7906 7.73 26.0706 7.51 26.4106 7.39C27.1506 7.13 28.1006 7 29.2606 7H29.3206ZM52.9039 7V17.32C52.9039 19.56 52.1939 20.98 50.7739 21.58C50.1539 21.86 49.3739 22 48.4339 22H47.3539V19.75C48.0539 19.75 48.4039 19.25 48.4039 18.25V8.23C48.4039 7.41 48.7639 7 49.4839 7H52.9039ZM40.9039 7H44.3239C45.0439 7 45.4039 7.41 45.4039 8.23V18.25C45.4039 19.25 45.7539 19.75 46.4539 19.75V22H45.3739C43.4939 22 42.2539 21.48 41.6539 20.44C41.1539 19.62 40.9039 18.58 40.9039 17.32V7ZM56.2869 7.03H58.1169C58.9969 7.03 59.6569 7.25 60.0969 7.69C60.5569 8.11 60.7869 8.66 60.7869 9.34V22H57.3669C57.0469 22 56.7869 21.89 56.5869 21.67C56.3869 21.45 56.2869 21.16 56.2869 20.8V7.03ZM56.4969 0.64C56.7169 0.419999 57.3569 0.309999 58.4169 0.309999C59.4769 0.309999 60.1169 0.419999 60.3369 0.64C60.5569 0.839999 60.6669 1.44 60.6669 2.44C60.6669 3.44 60.5469 4.05 60.3069 4.27C60.0869 4.49 59.4569 4.6 58.4169 4.6C57.3769 4.6 56.7369 4.49 56.4969 4.27C56.2769 4.05 56.1669 3.44 56.1669 2.44C56.1669 1.44 56.2769 0.839999 56.4969 0.64ZM68.6663 22H68.6063C66.6263 22 65.4063 21.66 64.9463 20.98C64.7263 20.66 64.5463 20.35 64.4063 20.05C64.2863 19.75 64.2063 19.28 64.1663 18.64C64.0663 17.48 64.0163 16.19 64.0163 14.77C64.0163 13.35 64.0263 12.33 64.0463 11.71C64.0663 11.07 64.1263 10.43 64.2263 9.79C64.3463 9.13 64.4963 8.66 64.6763 8.38C64.8563 8.08 65.1263 7.81 65.4863 7.57C65.8463 7.33 66.2663 7.18 66.7463 7.12C67.2263 7.04 67.8463 7 68.6063 7H68.6663V22ZM76.6463 17.26V18.79C76.6463 20.93 75.5563 22 73.3763 22H69.5963V19.75H71.2163C71.6363 19.75 71.8963 19.69 71.9963 19.57C72.0963 19.43 72.1463 19.19 72.1463 18.85V17.89C72.1463 17.59 72.1763 17.42 72.2363 17.38C72.3163 17.34 72.3663 17.32 72.3863 17.32C72.4063 17.3 72.4563 17.29 72.5363 17.29C72.6363 17.27 72.7063 17.26 72.7463 17.26C74.0463 17.26 75.3463 17.26 76.6463 17.26ZM69.5963 7H73.0763C74.4563 7 75.3963 7.27 75.8963 7.81C76.3963 8.35 76.6463 9.15 76.6463 10.21V12.85C76.6463 14.65 75.6663 15.55 73.7063 15.55H69.2963V13.3H70.9163C71.3963 13.3 71.7163 13.24 71.8763 13.12C72.0563 13 72.1463 12.77 72.1463 12.43V10.15C72.1463 9.81 72.0963 9.58 71.9963 9.46C71.8963 9.32 71.6363 9.25 71.2163 9.25H69.5963V7ZM91.0023 14.41H79.8123V11.11H91.0023V14.41ZM98.6 7V12.49C98.6 12.83 98.65 13.07 98.75 13.21C98.85 13.33 99.11 13.39 99.53 13.39H101.21V15.64H97.37C95.19 15.64 94.1 14.57 94.1 12.43V10.33C94.1 9.01 94.43 8.13 95.09 7.69C95.77 7.23 96.94 7 98.6 7ZM98.66 17.26V18.85C98.66 19.19 98.71 19.43 98.81 19.57C98.91 19.69 99.17 19.75 99.59 19.75H101.21V22H97.43C95.25 22 94.16 20.93 94.16 18.79V17.89C94.16 17.59 94.19 17.42 94.25 17.38C94.33 17.34 94.38 17.32 94.4 17.32C94.42 17.3 94.47 17.29 94.55 17.29C94.65 17.27 94.71 17.26 94.73 17.26C96.05 17.26 97.36 17.26 98.66 17.26ZM102.11 13.39H103.34C105.52 13.39 106.61 14.46 106.61 16.6V18.67C106.61 19.99 106.27 20.88 105.59 21.34C104.93 21.78 103.77 22 102.11 22V13.39ZM99.5 7H103.28C105.46 7 106.55 8.07 106.55 10.21V11.77C105.21 11.77 104.19 11.77 103.49 11.77C102.79 11.77 102.43 11.77 102.41 11.77C102.39 11.75 102.35 11.74 102.29 11.74C102.25 11.72 102.22 11.7 102.2 11.68C102.18 11.66 102.16 11.64 102.14 11.62C102.12 11.58 102.11 11.54 102.11 11.5C102.07 11.34 102.05 11.22 102.05 11.14V10.15C102.05 9.81 102 9.58 101.9 9.46C101.8 9.32 101.54 9.25 101.12 9.25H99.5V7ZM115.065 7H117.975C119.955 7 121.175 7.34 121.635 8.02C121.855 8.34 122.025 8.65 122.145 8.95C122.285 9.25 122.375 9.72 122.415 10.36C122.515 11.52 122.565 12.81 122.565 14.23C122.565 15.65 122.555 16.68 122.535 17.32C122.515 17.94 122.445 18.58 122.325 19.24C122.225 19.88 122.085 20.35 121.905 20.65C121.725 20.93 121.455 21.19 121.095 21.43C120.735 21.67 120.315 21.83 119.835 21.91C119.355 21.97 118.735 22 117.975 22H115.065V19.75H116.685C117.205 19.75 117.535 19.68 117.675 19.54C117.835 19.4 117.915 19.18 117.915 18.88V10.15C117.915 9.83 117.835 9.6 117.675 9.46C117.535 9.32 117.205 9.25 116.685 9.25H115.065V7ZM114.165 28.69H112.335C111.455 28.69 110.785 28.47 110.325 28.03C109.885 27.61 109.665 27.06 109.665 26.38V9.31C109.665 8.63 109.885 8.08 110.325 7.66C110.785 7.22 111.455 7 112.335 7H114.165V28.69ZM131.088 7H135.288C137.468 7 138.558 8.07 138.558 10.21V22H135.138C134.818 22 134.558 21.89 134.358 21.67C134.158 21.45 134.058 21.16 134.058 20.8V10.15C134.058 9.83 133.978 9.6 133.818 9.46C133.678 9.32 133.348 9.25 132.828 9.25H131.088V7ZM125.838 0.309999H127.668C128.548 0.309999 129.208 0.529999 129.648 0.969999C130.108 1.39 130.338 1.94 130.338 2.62V22H126.918C126.598 22 126.338 21.89 126.138 21.67C125.938 21.45 125.838 21.16 125.838 20.8V0.309999ZM146.42 22H146.36C144.38 22 143.16 21.66 142.7 20.98C142.48 20.66 142.3 20.35 142.16 20.05C142.04 19.75 141.96 19.28 141.92 18.64C141.82 17.48 141.77 16.19 141.77 14.77C141.77 13.35 141.78 12.33 141.8 11.71C141.82 11.07 141.88 10.43 141.98 9.79C142.1 9.13 142.25 8.66 142.43 8.38C142.61 8.08 142.88 7.81 143.24 7.57C143.6 7.33 144.02 7.18 144.5 7.12C144.98 7.04 145.6 7 146.36 7H146.42V22ZM154.4 17.26V18.79C154.4 20.93 153.31 22 151.13 22H147.35V19.75H148.97C149.39 19.75 149.65 19.69 149.75 19.57C149.85 19.43 149.9 19.19 149.9 18.85V17.89C149.9 17.59 149.93 17.42 149.99 17.38C150.07 17.34 150.12 17.32 150.14 17.32C150.16 17.3 150.21 17.29 150.29 17.29C150.39 17.27 150.46 17.26 150.5 17.26C151.8 17.26 153.1 17.26 154.4 17.26ZM147.35 7H150.83C152.21 7 153.15 7.27 153.65 7.81C154.15 8.35 154.4 9.15 154.4 10.21V12.85C154.4 14.65 153.42 15.55 151.46 15.55H147.05V13.3H148.67C149.15 13.3 149.47 13.24 149.63 13.12C149.81 13 149.9 12.77 149.9 12.43V10.15C149.9 9.81 149.85 9.58 149.75 9.46C149.65 9.32 149.39 9.25 148.97 9.25H147.35V7ZM160.776 7H164.376C164.496 7 164.556 7.07 164.556 7.21V9.04C164.556 9.18 164.476 9.25 164.316 9.25H162.966C162.486 9.25 162.206 9.34 162.126 9.52C162.046 9.78 162.006 10.07 162.006 10.39V19.69C162.006 20.37 161.776 20.93 161.316 21.37C160.876 21.79 160.216 22 159.336 22H157.506V10.33C157.506 9.15 157.766 8.3 158.286 7.78C158.826 7.26 159.656 7 160.776 7ZM171.293 22H171.233C169.253 22 168.033 21.66 167.573 20.98C167.353 20.66 167.173 20.35 167.033 20.05C166.913 19.75 166.833 19.28 166.793 18.64C166.693 17.48 166.643 16.19 166.643 14.77C166.643 13.35 166.653 12.33 166.673 11.71C166.693 11.07 166.753 10.43 166.853 9.79C166.973 9.13 167.123 8.66 167.303 8.38C167.483 8.08 167.753 7.81 168.113 7.57C168.473 7.33 168.893 7.18 169.373 7.12C169.853 7.04 170.473 7 171.233 7H171.293V22ZM179.273 17.26V18.79C179.273 20.93 178.183 22 176.003 22H172.223V19.75H173.843C174.263 19.75 174.523 19.69 174.623 19.57C174.723 19.43 174.773 19.19 174.773 18.85V17.89C174.773 17.59 174.803 17.42 174.863 17.38C174.943 17.34 174.993 17.32 175.013 17.32C175.033 17.3 175.083 17.29 175.163 17.29C175.263 17.27 175.333 17.26 175.373 17.26C176.673 17.26 177.973 17.26 179.273 17.26ZM172.223 7H175.703C177.083 7 178.023 7.27 178.523 7.81C179.023 8.35 179.273 9.15 179.273 10.21V12.85C179.273 14.65 178.293 15.55 176.333 15.55H171.923V13.3H173.543C174.023 13.3 174.343 13.24 174.503 13.12C174.683 13 174.773 12.77 174.773 12.43V10.15C174.773 9.81 174.723 9.58 174.623 9.46C174.523 9.32 174.263 9.25 173.843 9.25H172.223V7Z"
                fill="white"
              />
            </svg>
          </Link>
          <div className="flex flex-1 ">
            {/* <div className="flex  relative hover:bg-blue-950 h-16 w-32 ">
              <Link
                key="1"
                href="/"
                className={
            activeItem === "home" ? "text-yellow-400" : "text-white"
          } className="flex justify-center text-center  items-center w-full"
              >
                All movies
              </Link>
            </div> */}
            <div className="flex relative hover:bg-blue-950 h-16 w-24 ">
              <button
                onMouseEnter={handleToggle}
                onMouseLeave={handleToggle}
                className=" text-center items-center w-full ease-out "
              >
                Genres
              </button>
              <div
                className={
                  isOpen
                    ? "absolute top-full -left-[150px] bg-blue-950 p-3  rounded-bl-sm rounded-br-sm grid grid-cols-3 w-[420px] "
                    : ""
                }
                onMouseLeave={handleToggle}
              >
                {isOpen &&
                  genres.map((genre: any, index: any) => (
                    <Link key={index} href={`/genres/${genre.name}`}>
                      <ul>
                        <li
                          key={index}
                          id={genre.name}
                          className="text-left pl-2 border-l-[1px] hover:text-green-400 "
                          onClick={() => setActiveItem(genre.id)}
                        >
                          {genre.name}
                        </li>
                      </ul>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSearch}>
            <input
              type="search"
              id="search"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 h-8 rounded-3xl p-2 text-m text-black outline-none"
            />
          </form>
        </div>
        <div className="flex relative  ">
          {isRegisterVisible && (
            <Register handleCloseSignInForm={handleCloseSignInForm} />
          )}
          {/* {isRegisterVisible && (
            <Register
              handleCloseRegister={handleCloseRegister}
              isTrue={isTrue}
            />
          )}{" "} */}
          {isLoginVisible && (
            <Login handleCloseLoginForm={handleCloseLoginForm} />
          )}

          {currentUser ? (
            <div className="flex relative justify-center items-center  px-2 hover:bg-white hover:text-black hover:border-black h-10  rounded-tl-sm rounded-tr-sm  ">
              <button
                onMouseEnter={handleProfileToggle}
                onMouseLeave={handleProfileToggle}
                className=" h-16 min-w-24 max-w-36 font-bold truncate "
              >
                {auth?.currentUser?.email}
              </button>
              <div
                className={
                  isProfileOpen
                    ? "absolute top-full w-full  bg-white   rounded-bl-sm rounded-br-sm  "
                    : ""
                }
                onMouseLeave={handleProfileToggle}
              >
                {isProfileOpen && (
                  <div
                    className="  bg-white rounded-md overflow-hidden shadow-xl "
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      User
                    </a>
                    <a
                      onClick={logout}
                      href="/"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-6">
              <button
                onClick={handleOpenLoginForm}
                className="hover:text-green-400"
              >
                Login
              </button>
              <button
                onClick={handleOpenSignInForm}
                className="hover:text-green-400"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
