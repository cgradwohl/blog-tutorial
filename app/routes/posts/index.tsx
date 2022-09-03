import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

// cool way to pull the type from prisma
// import type { Post } from "@prisma/client";
import { getPosts } from "~/models/post.server";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
  // this is a cool way to pull the type from Prisma
  // posts: Post[];
};

/**
 * Loaders - your components API
 * Remix rendered on the server to send a full HTML
 * document like a traditional web framework, but it
 * also hydrated in the client and logged there too.
 */
export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();
  console.log(posts);
  return (
    <main>
      <h1>Posts</h1>
      {/* notice that the `to`touch app/routes/posts/admin.tsx prop is just "admin" and it linked to /posts/admin */}
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
