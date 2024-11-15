import { useQuery } from "@tanstack/react-query";
import hstkFetch from "../hstkFetch";
import { PostKeys } from "../query/QueryKeys";

export function useGetPostById(id) {
  return useQuery({
    queryKey: PostKeys.detail(id),
    queryFn: async () => {
      const response = await hstkFetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
}
