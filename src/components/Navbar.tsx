"use client";
import React, { FC, useState } from "react";
import {
  ChevronsUpDownIcon,
  CloseIcon,
  LanguagesIcon,
  LogoIcon,
  LongRightArrow,
  MenuIcon,
} from "@/icons";
import Link from "next/link";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui";
import {
  BLOG_PAGE_PATH,
  CAROUSEL_GENERATOR_PATH,
  DASHBOARD_PAGE_PATH,
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  PRICING_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from "@/pathNames";
import { usePathname, useRouter } from "next/navigation";

const Navbar: FC = () => {
  const [activePath, setActivePath] = useState<string>(HOME_PAGE_PATH);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const pathname = usePathname();

  const router = useRouter();

  const navItems = [
    {
      name: "Pricing",
      href: PRICING_PAGE_PATH,
    },
    {
      name: "Blog",
      href: BLOG_PAGE_PATH,
    },
    {
      name: "Dashboard",
      href: DASHBOARD_PAGE_PATH
    }
  ];

  return (
    <nav className="bg-slate-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <MenuIcon className="block size-6" />

              <CloseIcon className="hidden size-6" />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 md:block">
              <div className="flex space-x-4">
                <Link
                  href={HOME_PAGE_PATH}
                  onClick={() => setActivePath(HOME_PAGE_PATH)}
                  className="px-3 py-2"
                  aria-current="page"
                >
                  <LogoIcon className="w-24 h-auto" />
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setActivePath(item.href)}
                    className={`${
                      activePath === item.href
                        ? "text-gray-900 dark:text-white dark:bg-gray-900 border-indigo-500"
                        : "border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    } border-b-2 border-solid dark:border-none px-3 py-2 text-sm font-medium dark:rounded-md`}
                    aria-current={activePath === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-1 sm:gap-4">
            <Select
              name="language"
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="gap-1">
                <LanguagesIcon />
                <SelectValue placeholder="Language" />
                <ChevronsUpDownIcon className="dark:text-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="sp">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="bg-blue dark:text-white"
              onClick={() => router.push(CAROUSEL_GENERATOR_PATH)}
            >
              <span className="sm:hidden">Generate</span>
              <span className="hidden sm:inline">Generate Carousel</span>
              <LongRightArrow className="hidden sm:inline" />
            </Button>

            <Button
              onClick={() =>
                router.push(
                  pathname !== LOGIN_PAGE_PATH
                    ? LOGIN_PAGE_PATH
                    : SIGNUP_PAGE_PATH
                )
              }
            >
              {pathname !== LOGIN_PAGE_PATH ? "Login" : "Signup"}
            </Button>
          </div>
        </div>
      </div>

      <div
        x-description="Mobile menu, show/hide based on menu state."
        className="md:hidden"
        id="mobile-menu"
        x-show="open"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActivePath(item.href)}
              className={`${
                activePath === item.href
                  ? "text-indigo-700 bg-indigo-50 border-indigo-500 dark:text-white dark:bg-gray-900 border-l-4 border-solid dark:border-none"
                  : "text-gray-500 active:text-indigo-700 active:bg-indigo-50 dark:text-gray-300 dark:active:bg-gray-700 dark:active:text-white"
              } px-3 py-2 block text-base font-medium dark:rounded-md`}
              aria-current={activePath === item.href ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

// const Navbar: FC = () => {
//   return (
//     <div className="navigation" id="navbar">
//       <div className="logo-menu">
//         <div className="logo">Pixmart.</div>

//         <div className="menu">
//           <div className="menu-item">Pricing</div>

//           <div className="menu-item">Blog</div>
//         </div>
//       </div>

//       <div className="navbar">
//         <div className="overlap-group">
//           <div className="text-wrapper-2">Login</div>
//         </div>

//         <div className="group">
//           <div className="group-2">
//             {/* <img
//               className="svgrepo-iconcarrier"
//               alt="Svgrepo iconcarrier"
//               src={svgrepoIconcarrier}
//             /> */}

//             <div className="text-wrapper-3">English</div>

//             {/* <img className="vector" alt="Vector" src={vector} /> */}
//           </div>
//         </div>

//         <div className="group-wrapper">
//           <div className="group-3">
//             <div className="text-wrapper-4">Generate Carousel</div>

//             {/* <img
//               className="img"
//               alt="Svgrepo iconcarrier"
//               src={svgrepoIconcarrier1}
//             /> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Navbar;
