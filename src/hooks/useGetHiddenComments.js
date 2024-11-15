import { useQuery } from "@tanstack/react-query";
import { HiddenCommentKeys } from "../query/QueryKeys";
import { GetCommentsToIgnore } from "../store/CommentStore";

export function useGetHiddenComments() {
  return useQuery({
    queryKey: HiddenCommentKeys.all,
    queryFn: async () => {
      const response = await GetCommentsToIgnore();
      return response;
    },
  });
}
