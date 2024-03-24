"use client";

import { useTsRestQueryClient } from "@ts-rest/react-query";
import client from "./client";

export default function Page(): JSX.Element {
	const apiQueryClient = useTsRestQueryClient(client);

	const posts = client.getPosts.useQuery(["posts"], {});

	const allPosts = apiQueryClient.getPosts.useQuery(["all-posts"], {});

	const createPost = apiQueryClient.createPost.useMutation();

	// console.log("client", posts.data);
	// console.log("api query", allPosts.data);

	const onCreatePost = async () => {
		return createPost.mutate(
			{ body: { title: "New Title", description: "New description" } },
			{
				onSuccess: async (data) => {
					console.info(data);
					// posts.refetch();
					apiQueryClient.getPosts.setQueryData(
						["posts"],
						(oldPosts) => {
							console.log({ oldPosts });
							if (oldPosts)
								return {
									...oldPosts,
									body: [
										...(oldPosts?.body || []),
										data.body,
									],
								};
							else return oldPosts;
						}
					);
				},
			}
		);
	};

	return (
		<div>
			<h2>Hello</h2>
			<div>
				<button onClick={onCreatePost}>Create Post</button>
			</div>

			<h2>Posts - Client</h2>
			<div>
				{posts.data?.body.map((p, index) => (
					<div key={index}>
						{index + 1} - {p.title}
					</div>
				))}
			</div>

			<h2>Posts - Query API</h2>
			<div>
				{allPosts.data?.body.map((p, index) => (
					<div key={index}>
						{index + 1} - {p.title}
					</div>
				))}
			</div>
		</div>
	);
}
