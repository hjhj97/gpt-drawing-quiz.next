import CardList from "@/components/card-list";
import { getAllPosts } from "../actions/post";

export default async function Board() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) return <div>No posts</div>;
  return <CardList posts={posts} />;
}
