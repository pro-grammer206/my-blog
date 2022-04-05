import React from "react";
import Layout from "../components/Layout";
import Image from "next/image";

import github from "../public/github.svg";

const about = () => {
  return (
    <Layout>
      <section>
        <div id="desc">
          <p>Web Developer</p>
          <a
            href="https://github.com/pro-grammer206"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={github} alt="github link" className="glink" />
          </a>
        </div>
        <div>
          <p>Web Techologies used</p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>
        </div>
        <div>
          <p>CSS Frameworks used</p>
          <ul>
            <li>Bootstrap</li>
            <li>Tailwindcss</li>
            <li>Chakraui</li>
          </ul>
        </div>
        <div>
          <p>FrontEnd libraries used</p>
          <ul>
            <li>Jquery</li>
            <li>React</li>
            <li>Vuejs</li>
          </ul>
        </div>
        <div>
          <p>Databases used</p>
          <ul>
            <li>MySql</li>
            <li>MongoDB</li>
          </ul>
        </div>
        <div>
          <p>Frameworks used </p>
          <ul>
            <li>Express</li>
            <li>Nextjs</li>
          </ul>
        </div>
        <div>
          <p>Deployements used</p>
          <li>Netlify</li>
          <li>Github pages</li>
        </div>
        <div>
          <p>Headless CMS used</p>
          <li>Contentful</li>
        </div>
        <div>
          <p>React animation libraries used</p>
          <li>Spring</li>
          <li>Framer motion</li>
        </div>
      </section>
      <style jsx>{`
        div {
          background-color: rgb(3, 3, 3, 0.5);
          padding: 1rem;
          font-weight: bold;
          font-size: 1.4rem;
          color: white;
          margin: 2rem;
          animation-name: slidedown;
          animation-duration: 0.5s;
        }
        section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        #desc {
          grid-column: 1/4;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
        }
        @media (max-width: 500px) {
          section {
            display: flex;
            flex-direction: column;
          }
        }

        ul {
          padding: 1rem;
        }
        @keyframes slidedown {
          from {
            transform: translateY(-500px);
          }
          to {
            transform: translateY(0px);
          }
        }
        div:hover {
          box-shadow: 0 0 0.5rem 0.5rem silver;
        }
      `}</style>
    </Layout>
  );
};

export default about;
