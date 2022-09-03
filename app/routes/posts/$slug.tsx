import { marked } from "marked";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// invariant is a TS asserts wrapper :)
import invariant from "tiny-invariant";

// we exported Post, so you can use the model directly from prisma as a TS TYPE
import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";

type LoaderData = {
  post: Post;
  html: string;

  // or you can use the cool TS way
  // this makes the type be "whatever is returned by getPost"
  // post: Awaited<ReturnType<typeof getPost>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  // Because params comes from the URL, we can't be totally sure that params.slug
  // will be defined--maybe you change the name of the file to $postId.ts! It's
  // good practice to validate that stuff with invariant, and it makes TypeScript happy too.
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);

  return json<LoaderData>({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData<LoaderData>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
