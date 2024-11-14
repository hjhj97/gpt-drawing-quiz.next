import { getAllPosts } from "@/app/actions/post";
import Image from "next/image";
import Link from "next/link";
import Card from "./card";

export default async function CardList() {
  const posts = await getAllPosts();
  if (!posts || posts.length === 0) return <div>No posts</div>;

  return (
    <div className="flex flex-col gap-8 mt-16 p-8 max-w-[1200px] mx-auto">
      <div>
        <p className="text-lg font-bold">
          총 {posts.length}개의 작품이 전시되어 있습니다
        </p>
      </div>

      <div className="flex flex-wrap gap-8">
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
