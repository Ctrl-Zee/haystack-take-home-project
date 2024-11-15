import { useQuery } from "@tanstack/react-query";
import hstkFetch from "../hstkFetch";
import { PostKeys } from "../query/QueryKeys";

export function useGetPosts() {
  return useQuery({
    queryKey: PostKeys.all,
    queryFn: async () => {
      const response = await hstkFetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
}
