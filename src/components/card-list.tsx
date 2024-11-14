import { getAllPosts } from "@/app/actions/post";
import Image from "next/image";
import Link from "next/link";

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
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="bg-white rounded-lg w-full sm:w-[calc(50%-2rem)]"
          >
            <div className="p-4 flex flex-col gap-4 items-center  aspect-square">
              <p className="text-lg font-bold">문제 : {post.answer}</p>
              <div className="relative w-full h-[80%]">
                <Image
                  src={post.image_url}
                  alt="post"
                  fill
                  className="object-cover rounded-lg border-2 border-gray-300"
                />
              </div>
              {post.guess && (
                <p className="text-lg font-bold">GPT : {post.guess}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
