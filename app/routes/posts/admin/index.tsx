import { Link } from "@remix-run/react";

export default function AdminIndex() {
  return (
    <p>
      {/* the <Outlet/> in routes/posts/admin will automatically swap out the index route for the "new" route */}
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
}
