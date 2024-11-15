import { useMutation } from "@tanstack/react-query";
import { SetCommentsToIgnore } from "../store/CommentStore";

export function useUpdateHiddenComments() {
  return useMutation({
    mutationFn: async (comments) => {
      try {
        await SetCommentsToIgnore(comments);
        return comments;
      } catch (error) {
        throw new Error("Failed to set comments to ignore: " + error.message);
      }
    },
  });
}
