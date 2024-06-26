"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { mainLinks } from "@/contants";
import { userLinks } from "@/contants";
import { User } from "@prisma/client";
import wave from '../public/wave.png'
//icons
import {
  AiOutlineUser,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import CartIcon from "@/app/(shoppingcart)/components/ui/CartIcon";
import WishlistIcon from "@/app/(wishlist)/components/WishlistIcon";
interface NavbarProps {
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [openMobileMenu, setOpenMobileMenu] =
    useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const userMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };
  return (
    <nav>
      <div className="main-container border-b border-1 flex justify-between items-center py-2 relative">
        <Link href={"/"}>
          <div className="relative flex gap-1 items-center text-xl font-medium text-black">
            <h1 className="z-10">Urshirts</h1>
            <Image className=' z-5 absolute top-[1.3px] left-[1.3px] w-15 rotate-3 h-10' src={wave} alt="logo" />
          </div>
        </Link>

        <ul className="flex gap-10 max-md:hidden">
          {mainLinks.map((link, index) => (
            <Link className='transition ease-in-out delay-100 px-1 text-slate-950 hover:-translate-y-1 hover:scale-110 py-1 rounded-lg hover:decoration-zinc-400 duration-200' key={index} href={link.route}>
              <li className="font-semibold">{link.label}</li>
            </Link>
          ))}
        </ul>

        <div className="flex gap-5 text-xl [&>*]:cursor-pointer">
          <div className="transition ease-in-out delay-100 px-1 text-slate-950 hover:-translate-y-1 hover:scale-110 py-1 rounded-lg hover:decoration-zinc-400 duration-200">
          <CartIcon />
          </div>
          <div className="transition ease-in-out delay-100 px-1 text-slate-950 hover:-translate-y-1 hover:scale-110 py-1 rounded-lg hover:decoration-zinc-400 duration-200">
          <WishlistIcon />
          </div>
          <div
            className="max-md:hidden flex items-center justify-center"
            >
            {user && <div className="text-sm mr-2">Welcome, {user?.email?.split('@')[0]}</div>}
            {" "}
            <div
              onClick={userMenuHandler}
            >
              <AiOutlineUser />
            </div>
          </div>
          <div
            className="md:hidden"
            onClick={mobileMenuHandler}
          >
            {openMobileMenu ? <MdClose /> : <FiMenu />}
          </div>
        </div>

        {/* USER MENU */}
        {openUserMenu && (
          <div className="z-10 absolute right-0 top-[40px] w-18 bg-gray-700 shadow-md rounded-md p-4 text-white max-md:hidden text-center">
            {!user ? (
              <ul>
                <Link
                  onClick={() => setOpenUserMenu(false)}
                  href={"/sign-in"}
                >
                  <li>Log In</li>
                </Link>
                <Link
                  onClick={() => setOpenUserMenu(false)}
                  href={"/sign-up"}
                >
                  <li>Sign Up</li>
                </Link>
              </ul>
            ) : (
              <ul>
                {userLinks.map((link, index) => (
                  <Link
                    onClick={() => setOpenUserMenu(false)}
                    key={index}
                    href={link.route}
                  >
                    <li className="transition ease-in-out delay-100 px-1 text-slate-100 hover:-translate-y-1 hover:scale-110 py-1 rounded-lg hover:decoration-zinc-400 duration-200">{link.label}</li>
                  </Link>
                ))}
                <li
                  className="cursor-pointer transition ease-in-out delay-100 px-1 text-slate-100 hover:-translate-y-1 hover:scale-110 py-1 rounded-lg hover:decoration-zinc-400 duration-200"
                  onClick={() => signOut()}
                >
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* MOBILE MENU */}
      {openMobileMenu && (
        <div className="md:hidden">
          <div className="absolute right-5 w-48 bg-gray-700 py-5 shadow-md rounded-md p-4 text-white text-center z-[99999]">
            <ul className="flex flex-col gap-5">
              {mainLinks.map((link, index) => (
                <Link key={index} href={link.route}>
                  <li>{link.label}</li>
                </Link>
              ))}
              {!user ? (
                <>
                  <Link href={"/sign-in"}>
                    <li>Log In</li>
                  </Link>
                  <Link href={"/sign-up"}>
                    <li>Sign Up</li>
                  </Link>
                </>
              ) : (
                <>
                  {userLinks.map((link, index) => (
                    <Link key={index} href={link.route}>
                      <li>{link.label}</li>
                    </Link>
                  ))}
                  <li
                    className="cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;