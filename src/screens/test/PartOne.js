import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import localPlaceholderData from "../../localPlaceholderData";
import { FlatList } from "react-native-web";
import { AntDesign } from "@expo/vector-icons";

export default function () {
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

  return (
    <SafeAreaView>
      <FlatList
        data={localPlaceholderData}
        renderItem={({ item }) => <ListItem title={item.title} id={item.id} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
