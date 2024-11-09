import Image from "next/image";
import { getPostById } from "@/app/actions/post";

export default async function Post({ params }: any) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) return <div>Post not found</div>;
  return (
    <div>
      <h1>{post.answer}</h1>
      <Image src={post.image_url} alt="post" width={400} height={400} />
    </div>
  );
}
