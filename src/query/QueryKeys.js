export const PostKeys = {
  all: ["Posts"],
  part: (id) => [...PostKeys.all, "Part", { id }],
  detail: (id) => [...PostKeys.all, { id }],
};

export const CommentKeys = {
  all: ["Comment"],
  detail: (id) => [...CommentKeys.all, { id }],
};
