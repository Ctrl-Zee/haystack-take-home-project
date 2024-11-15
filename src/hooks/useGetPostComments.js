import { useQuery } from "@tanstack/react-query";
import hstkFetch from "../hstkFetch";
import { CommentKeys } from "../query/QueryKeys";

export function useGetPostComments(id) {
  return useQuery({
    queryKey: CommentKeys.detail(id),
    queryFn: async () => {
      const response = await hstkFetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
}
