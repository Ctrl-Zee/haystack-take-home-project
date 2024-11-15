import { useQuery } from "@tanstack/react-query";
import hstkFetch from "../hstkFetch";
import { PostKeys } from "../query/QueryKeys";

/**
 * I am passing partId so the activity indicator will load for part 2 and 3.
 * If I didn't pass the partId the queryKey would be the same and cahced data woul be used
 * while the data was refreshed in the background.
 * Probably overkill for this but I wanted to make sure it worked as expected.
 */
export function useGetPosts(partId) {
  return useQuery({
    queryKey: PostKeys.part(partId),
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
