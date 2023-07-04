import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.svg";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <>
      <nav className='flexBetween navbar'>
        <div className='flex-1 flexStart gap-10'>
          <Link href={"/"}>
            <Image src={logo} alt='flexible' width={116} height={43} />
          </Link>
          <ul className='xl:flex hidden text-small gap-7'>
            {NavLinks.map((link: any) => (
              <Link href={link.href} key={link.text}>
                {link.text}
              </Link>
            ))}
          </ul>
        </div>
        <div className='flexCenter gap-4'>
          {session?.user ? (
            <>
              {session?.user?.image && <ProfileMenu session={session} />}
              <Link href={"/create-project"}>Share Work</Link>
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
