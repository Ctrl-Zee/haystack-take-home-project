import { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { FlatList } from "react-native-web";
import { AntDesign } from "@expo/vector-icons";
import { useGetPosts } from "../../hooks/useGetPosts";

// Note: The activity indicator will only show when there is no data in the query cache.
// This is because the query will be fetched from the cache first before fetching from the server.
export default function () {
  const { data: posts, isLoading } = useGetPosts(2);
  const [searchText, setSearchText] = useState("");

  const filteredPosts =
    searchText !== ""
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : posts;

  const ListItem = ({ title, id }) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <AntDesign name="barcode" size={24} />
        <View style={styles.text}>
          <Text>{id}</Text>
          <Text>{title}</Text>
        </View>
      </View>
      <AntDesign name="right" />
    </View>
  );

  const renderSearch = () => {
    if (isLoading) {
      return null;
    }
    return (
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search"
      />
    );
  };

  const renderEmptyComponent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    return <Text>No Results</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderSearch()}
      <FlatList
        data={filteredPosts}
        renderItem={({ item }) => <ListItem title={item.title} id={item.id} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyComponent()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    flex: 1,
  },
  text: {
    width: "50%",
    marginLeft: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
  },
});
