import React from "react";
import Link from "next/link";
import { useState } from "react";
import github from "../public/github.svg";
import Image from "next/image";

const Nav = ({ show, setShow }) => {
  return (
    <>
      <nav>
        <Link href="/">
          <a>Welcome to my Blog</a>
        </Link>
        <section>
          <Link href="/">Home</Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <a
            href="https://github.com/pro-grammer206"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={github} alt="github" className="glink" />
          </a>
        </section>
      </nav>
    </>
  );
};

export default Nav;
