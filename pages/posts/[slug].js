import { createClient } from "contentful";
import Layout from "../../components/Layout";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import moment from "moment";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";

const client = createClient({
  accessToken: process.env.API_KEY,
  space: process.env.S_ID,
});

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: "blog",
  });
  const slugs = data.items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: "blog",
  });

  return {
    props: {
      spost: data.items.find((item) => item.fields.slug === params.slug),
    },
    revalidate: 10,
  };
}

function article({ spost }) {
  const [vpost, setVpost] = useState({});
  const [pcontent, setPContent] = useState("");
  useEffect(() => {
    if (spost) {
      setVpost(spost.fields);
      setPContent(documentToHtmlString(vpost.content));
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>{vpost ? vpost.postTitle : ""}</title>
      </Head>
      <div className="post">
        <h2>{vpost.postTitle}</h2>
        <p>{moment(vpost.createdAt).fromNow()}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(vpost.content),
          }}
        />
      </div>
      <Link href="/">
        <a>All Posts</a>
      </Link>
    </Layout>
  );
}
export default article;
