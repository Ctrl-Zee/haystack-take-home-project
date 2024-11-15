export const PostKeys = {
  all: ["Posts"],
  detail: (id) => [...PostKeys.all, { id }],
};

export const CommentKeys = {
  all: ["Comment"],
  detail: (id) => [...CommentKeys.all, { id }],
};
