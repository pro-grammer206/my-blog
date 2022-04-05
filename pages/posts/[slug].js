import React from "react";
import { createClient } from "contentful";
import Layout from "../../components/Layout";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import moment from "moment";
import Link from "next/link";

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
    revalidate: 30,
  };
}

function article({ spost }) {
  const { postTitle, createdAt, content } = spost.fields;
  const tpost = moment(createdAt).fromNow();
  const tobeRendered = documentToHtmlString(content);

  return (
    <Layout>
      <div className="post">
        <h2>{postTitle}</h2>
        <p>Posted {tpost}</p>
        <div dangerouslySetInnerHTML={{ __html: tobeRendered }} />
      </div>
      <Link href="/">
        <a>All Posts</a>
      </Link>
    </Layout>
  );
}
export default article;
