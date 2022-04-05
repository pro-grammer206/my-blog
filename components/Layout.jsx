import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useState } from "react";

const Layout = ({ children }) => {
  const [show, setShow] = useState(true);
  return (
    <div className="layout">
      {show ? (
        <Nav setShow={setShow} show={show} />
      ) : (
        <div className="ham" onClick={() => setShow(!show)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <main
        onClick={() => {
          if (show) setShow(!show);
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
