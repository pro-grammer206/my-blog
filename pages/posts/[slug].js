import React from "react";
import { createClient } from "contentful";
import Layout from "../../components/Layout";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import moment from "moment";
import Link from "next/link";
export async function getStaticPaths() {
  const client = createClient({
    accessToken: process.env.API_KEY,
    space: process.env.S_ID,
  });
  const data = await client.getEntries({
    content_type: "blog",
  });
  const slugs = data.items.map((item) => item.fields.slug);
  const content = slugs.map((s) => {
    return { params: { slug: s } };
  });

  return {
    paths: content,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const client = createClient({
    accessToken: process.env.API_KEY,
    space: process.env.S_ID,
  });
  const data = await client.getEntries({
    content_type: "blog",
  });
  const spost = data.items.filter((item) => item.fields.slug === params.slug);

  return {
    props: {
      spost,
    },
    revalidate: 30,
  };
}

function article({ spost }) {
  const { postTitle, createdAt } = spost[0].fields;
  const tpost = moment(createdAt).fromNow();
  const content = spost[0].fields.content.content[0].content[0].value;
  const tobeRendered = documentToHtmlString(spost[0].fields.content);

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
