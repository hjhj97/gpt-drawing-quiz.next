import Image from "next/image";
import { getPostById } from "@/app/actions/post";

export default async function Post({ params }: any) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) return <div>Post not found</div>;
  return (
    <div className="flex flex-col mt-16 items-center justify-center">
      <div className="flex justify-between ">
        <p className="text-2xl font-bold">제시어 : {post.answer}</p>
      </div>
      <div className="relative mt-4 w-[1000px] h-[720px] bg-white rounded-lg">
        <Image src={post.image_url} alt="post" width={1080} height={720} />
      </div>
      <p className="text-lg mt-8 font-bold bg-yellow-100 p-3 rounded-lg shadow-md border-2 border-yellow-300">
        GPT : {post.guess}
      </p>
    </div>
  );
}
