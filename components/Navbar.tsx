"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import shopifyLogo from "../assets/images/shopify.svg";
import { usePathname } from "next/navigation";

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
      name: "cart",
      route: "/cart",
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
              <ul className="flex items-center justify-center gap-8">
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
    </>
  );
};

export default Navbar;
