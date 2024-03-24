"use client";

import { useTsRestQueryClient } from "@ts-rest/react-query";
import client from "./client";

export default function Page(): JSX.Element {
  const apiQueryClient = useTsRestQueryClient(client);

  const posts = client.getPosts.useQuery(["posts"], {});

  const allPosts = apiQueryClient.getPosts.useQuery(["all-posts"], {});

  console.log(posts.data);
  console.log(allPosts);

  return (
    <div>
      Hello
    </div>
  );
}
