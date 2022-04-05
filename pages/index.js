import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { createClient } from "contentful";
import Link from "next/link";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.S_ID,
    accessToken: process.env.API_KEY,
  });

  const info = await client.getEntries();
  const blog = info.items.filter(
    (items) => items.sys.contentType.sys.id === "blog"
  );
  return {
    props: { details: blog },
  };
}

export default function Home({ details }) {
  return (
    <Layout>
      <h3>My Articles</h3>
      <div className="posts">
        {details.map((d) => (
          <Link key={d.fields.postId} href={`/posts/${d.fields.slug}`}>
            <a>
              <Card title={d.fields.postTitle} />
            </a>
          </Link>
        ))}
        <a
          href="https://github.com/pro-grammer206"
          target="_blank"
          rel="noreferrer"
        >
          <p>Checkout my github</p>
        </a>
      </div>
    </Layout>
  );
}
