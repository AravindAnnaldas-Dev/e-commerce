"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import shopifyLogo from "../assets/images/shopify.svg";
import { usePathname } from "next/navigation";
import { HiOutlineMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const pathName = usePathname();

  const pageRoutes = [
    {
      name: "home",
      route: "/",
    },
    {
      name: "about",
      route: "/about",
    },
    {
      name: "products",
      route: "/products",
    },
    {
      name: "contact",
      route: "/contact",
    },
    {
      name: "login",
      route: "/login",
    },
  ];

  useEffect(() => {
    let initialScrollPosition = 0;
    const scrollTrigger = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition - initialScrollPosition > 0) {
        document
          .querySelector(".eco_nav_section")
          ?.classList.add("active_scroll");
      } else {
        document
          .querySelector(".eco_nav_section")
          ?.classList.remove("active_scroll");
      }
      initialScrollPosition = currentScrollPosition;
    };

    window.addEventListener("scroll", scrollTrigger);

    return () => {
      window.removeEventListener("scroll", scrollTrigger);
    };
  }, []);

  const onMenuNavOpenHandler = () => {
    const ecoMobileNavCtn = document.querySelector(".eco_mobile_nav_ctn");
    ecoMobileNavCtn?.classList.add("active_mobile_nav");
  };

  const onMenuNavCloseHandler = () => {
    const ecoMobileNavCtn = document.querySelector(".eco_mobile_nav_ctn");
    ecoMobileNavCtn?.classList.remove("active_mobile_nav");
  };

  return (
    <>
      <div className="eco_nav_section">
        <div className="eco_nav_container">
          <div className="eco_nav_wrapper">
            <div className="w-full h-full max-w-[140px]">
              <Link href={"/"}>
                <Image
                  className="w-full h-full object-contain object-center"
                  src={shopifyLogo}
                  alt="shopify_logo"
                ></Image>
              </Link>
            </div>
            <div className="w-[fit-content]">
              <button
                className="w-10 h-10 hidden max-[767px]:flex items-center justify-center"
                onClick={onMenuNavOpenHandler}
              >
                <HiOutlineMenu className="w-7 h-7" />
              </button>
              <ul className="hidden items-center justify-center gap-8 min-[768px]:flex">
                {pageRoutes.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        pathName === item.route
                          ? "underline underline-offset-[6px]"
                          : ""
                      } list-none`}
                    >
                      <Link href={item.route}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="eco_mobile_nav_ctn fixed w-full h-full top-0 p-4 z-[10000] translate-y-[-100%] transition-all duration-300">
        <div className="w-full h-full bg-[#212121] p-4 rounded-lg shadow-[0_20px_30px_#ffffff10] flex flex-col items-end justify-start">
          <button onClick={onMenuNavCloseHandler}>
            <CgClose className="w-8 h-8" />
          </button>
          <ul className="w-full">
            {pageRoutes.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    pathName === item.route
                      ? "underline underline-offset-[6px]"
                      : ""
                  } list-none py-4 px-3`}
                >
                  <Link href={item.route} onClick={onMenuNavCloseHandler}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
