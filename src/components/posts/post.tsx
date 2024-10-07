import { PostData } from "@/lib/types";

type PostProps = {
  post: PostData;
};

export default function Post({ post }: PostProps) {
  return <article>{post.content}</article>;
}
