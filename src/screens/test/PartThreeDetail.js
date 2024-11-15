import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { useGetPostById } from "../../hooks/useGetPostById";
import { useGetPostComments } from "../../hooks/useGetPostComments";
import { useGetHiddenComments } from "../../hooks/useGetHiddenComments";
import { useUpdateHiddenComments } from "../../hooks/useUpdateHiddenComments";
import { useQueryClient } from "@tanstack/react-query";
import { HiddenCommentKeys } from "../../query/QueryKeys";

export default function ({ route }) {
  const { data: post, isLoading: postLoading } = useGetPostById(
    route.params.id
  );
  const { data: comments, isLoading: commentsLoading } = useGetPostComments(
    route.params.id
  );
  const { data: hiddenComments } = useGetHiddenComments();
  const { mutate: hideComment } = useUpdateHiddenComments();
  const queryClient = useQueryClient();

  const isLoading = postLoading || commentsLoading;

  const visibleComments = comments?.filter(
    (comment) =>
      !hiddenComments.some(
        (hidden) => hidden.id === comment.id && hidden.postId === comment.postId
      )
  );

  const handleHideComment = (comment) => {
    hideComment([...hiddenComments, comment], {
      onSettled: () => {
        queryClient.invalidateQueries(HiddenCommentKeys.all);
      },
    });
  };

  const ListItem = ({ comment }) => (
    <View>
      <DisplayItem title="Email" detail={comment.email} />
      <DisplayItem title="Body" detail={comment.body} />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => handleHideComment(comment)}
        >
          <Text style={styles.buttonText}>Hide Comment</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <DisplayItem title="Title" detail={post.title} />
          <DisplayItem title="Body" detail={post.body} />
          <View style={styles.displayContainer}>
            <Text style={styles.title}>Comments</Text>
          </View>
          <FlatList
            data={visibleComments}
            renderItem={({ item }) => <ListItem comment={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const DisplayItem = ({ title, detail }) => (
  <View style={styles.displayContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text>{detail}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  displayContainer: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
  button: {
    width: 150,
    borderRadius: 6,
    padding: 16,
    backgroundColor: "firebrick",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
