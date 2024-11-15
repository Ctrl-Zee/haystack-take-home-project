import { useState } from "react";
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

export default function ({ route }) {
  const { data: post, isLoading: postLoading } = useGetPostById(
    route.params.id
  );
  const { data: comments, isLoading: commentsLoading } = useGetPostComments(
    route.params.id
  );
  const [hiddenComments, setHiddenComment] = useState([]);

  const isLoading = postLoading || commentsLoading;

  const visibleComments = comments?.filter(
    (comment) => !hiddenComments.includes(comment.id)
  );

  const handleHideComment = (id) => {
    setHiddenComment([...hiddenComments, id]);
  };

  const ListItem = ({ id, email, body }) => (
    <View>
      <DisplayItem title="Email" detail={email} />
      <DisplayItem title="Body" detail={body} />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => handleHideComment(id)}>
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
            renderItem={({ item }) => (
              <ListItem id={item.id} email={item.email} body={item.body} />
            )}
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
