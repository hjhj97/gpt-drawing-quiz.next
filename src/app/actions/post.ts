"use server";

import { IPost } from "@/types/post";
import { getFileName } from "@/utils/file";
import { createClient } from "@/utils/supabase/server";

export const getAllPosts = async (): Promise<IPost[] | null> => {
  const client = await createClient();
  const { data: posts, error } = await client.from("posts").select("*");
  if (error) throw new Error(error.message);
  return posts;
};
export const getPostById = async (id: number): Promise<IPost | null> => {
  const client = await createClient();
  const { data: post, error } = await client
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return post;
};
export const createPost = async (
  post: Omit<IPost, "id" | "image_url" | "created_at">,
  imageFile: Blob
): Promise<IPost | null> => {
  const client = await createClient();
  const fileName = getFileName();
  const imageName = `${fileName}-${post.answer}.png`;

  await uploadImage(imageFile, imageName);

  const {
    data: { publicUrl },
  } = client.storage.from("images").getPublicUrl(imageName);

  const { data: postData, error: postError } = await client
    .from("posts")
    .insert({
      ...post,
      image_url: publicUrl,
    });
  if (postError) throw new Error(postError.message);
  return postData;
};
export const uploadImage = async (imageFile: Blob, imageName: string) => {
  const client = await createClient();
  const { error: imageError } = await client.storage
    .from("images")
    .upload(imageName, imageFile, { contentType: "image/png" });

  if (imageError) {
    console.error(imageError);
    throw new Error("이미지 업로드 중 에러가 발생했습니다.");
  }
};
