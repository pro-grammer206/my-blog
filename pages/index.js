import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { createClient } from "contentful";
import Link from "next/link";
import moment from "moment";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.S_ID,
    accessToken: process.env.API_KEY,
  });

  const info = await client.getEntries();
  return {
    props: {
      details: info.items.filter(
        (items) => items.sys.contentType.sys.id === "blog"
      ),
    },
    revalidate: 30,
  };
}

export default function Home({ details }) {
  return (
    <Layout>
      <Head>
        <title>Home Page</title>
      </Head>
      <h3>My Articles</h3>
      <div className="posts">
        {details ? (
          details.map((d) => (
            <Link key={d.fields.postId} href={`/posts/${d.fields.slug}`}>
              <a>
                <Card
                  title={d.fields.postTitle}
                  time={moment(d.fields.createdAt).fromNow()}
                />
              </a>
            </Link>
          ))
        ) : (
          <p>loading</p>
        )}
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
