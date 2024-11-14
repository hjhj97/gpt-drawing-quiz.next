import Image from "next/image";
import Link from "next/link";
import { IPost } from "@/types/post";

type CardProps = {
  post: IPost;
};

export default function Card({ post }: CardProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="bg-white rounded-lg w-full sm:w-[calc(50%-2rem)]"
    >
      <div className="relative p-4 flex flex-col gap-4 items-center aspect-square">
        {post.is_correct && (
          <div className="absolute top-4 right-6 bg-green-700 bg-opacity-50 rounded-lg px-2 py-1 text-white">
            정답
          </div>
        )}
        <p className="text-lg font-bold">문제 : {post.answer}</p>
        <div className="relative w-full h-[80%]">
          <Image
            src={post.image_url}
            alt="post"
            fill
            className="object-cover rounded-lg border-2 border-gray-300"
          />
        </div>
        {post.guess && <p className="text-lg font-bold">GPT : {post.guess}</p>}
      </div>
    </Link>
  );
}
