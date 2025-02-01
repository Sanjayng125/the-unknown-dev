"use client";

import useDetailsStore from "@/context/mystore";
import Link from "next/link";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  const { contacts } = useDetailsStore();

  return (
    <footer className="w-full flex items-center mt-5 bg-gray-900 p-5">
      <div className="flex flex-col gap-5 w-full">
        <p className="text-center text-xl text-gray-400">Contact</p>
        {contacts.email ||
        contacts.linkedin ||
        contacts.twitter ||
        contacts.github ||
        contacts.instagram ? (
          <div className="flex items-center justify-center gap-5 w-full">
            {contacts?.email && (
              <Link href={`mailto:${contacts.email}`} className="text-3xl">
                <FiMail />
              </Link>
            )}

            {contacts?.linkedin && (
              <Link
                href={contacts.linkedin}
                className="text-3xl"
                target="_blank"
              >
                <FaLinkedin />
              </Link>
            )}

            {contacts?.twitter && (
              <Link
                href={contacts.twitter}
                target="_blank"
                className="text-3xl"
              >
                <FaXTwitter />
              </Link>
            )}

            {contacts?.github && (
              <Link href={contacts.github} target="_blank" className="text-3xl">
                <FaGithub />
              </Link>
            )}

            {contacts?.instagram && (
              <Link
                href={contacts.instagram}
                className="text-3xl"
                target="_blank"
              >
                <FaInstagram />
              </Link>
            )}
          </div>
        ) : (
          <p className="text-center">Add your contacts to see them here</p>
        )}

        <p className="text-center text-sm text-gray-400">
          Made with ❤️ by Sanjay
        </p>
      </div>
    </footer>
  );
};

export default Footer;
