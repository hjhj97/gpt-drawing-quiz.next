"use server";

import { IPost } from "@/types/post";
import { b64toBlob } from "@/utils/file";
import { createClient } from "@/utils/supabase/server";
import { decode } from "base64-arraybuffer";

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
  post: Omit<IPost, "id" | "image_url">,
  imageFile: Blob
): Promise<IPost | null> => {
  const client = await createClient();
  const imageName = `${Date.now()}-${post.answer}.png`;

  const { error: imageError } = await client.storage
    .from("images")
    .upload(imageName, imageFile, { contentType: "image/png" });

  if (imageError) {
    console.error(imageError);
    throw new Error("이미지 업로드 중 에러가 발생했습니다.");
  }

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
