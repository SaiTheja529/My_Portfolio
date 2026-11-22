'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS, PROFILE, SOCIALS } from "@/constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link
          href="#about-me"
          className="flex items-center"
        >
          {/* Avatar: grows on hover with a spinning ring + ripple circle */}
          <span className="group/avatar relative flex h-11 w-11 items-center justify-center transition-transform duration-300 ease-out hover:scale-[1.25]">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,#7042f8,#22d3ee,#e59cff,#7042f8)] opacity-0 transition-opacity duration-300 group-hover/avatar:animate-spin group-hover/avatar:opacity-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-cyan-400/80 opacity-0 group-hover/avatar:animate-ping group-hover/avatar:opacity-100"
            />
            <Image
              src="/profile-avatar.jpg"
              alt={PROFILE.name}
              width={44}
              height={44}
              draggable={false}
              className="relative z-10 h-11 w-11 origin-center cursor-pointer rounded-full border-2 border-[#030014] object-cover shadow-[0_0_14px_#7042f8aa] ring-2 ring-[#7042f8]"
            />
          </span>
          <div className="hidden xl:flex font-semibold ml-[18px] text-gray-200">
            {PROFILE.name}
          </div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[520px] h-full flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
              >
                {link.title}
              </Link>
            ))}

          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target={link.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={name}
              key={name}
            >
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none text-4xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] p-5 flex flex-col items-center text-gray-300 md:hidden">
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target={link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                aria-label={name}
                key={name}
              >
                <Icon className="h-8 w-8 text-white" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};