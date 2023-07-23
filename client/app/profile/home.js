import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const data = [
  {
    id: "83183182818281",
    name: "SRM Foods",
    status: true,
    rating: 3.5,
  },
  {
    id: "831dwdw",
    name: "Andhra Mess",
    status: false,
    rating: 3.6,
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 600 }}>
        Recently Scanned
      </Text>

      <FlatList
        data={data}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              disabled={!item.status}
              style={[styles.itemContainer, { opacity: item.status ? 1 : 0.5 }]}
            >
              <Text style={styles.item}>{item.name}</Text>

              <View style={styles.itemRating}>
                <Icon name="star" size={10} color="#f5c71a" />
                <Text>{item.rating}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 20,
    color: "blue",
  },
  itemContainer: {
    height: 80,
    position: "relative",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "lightgray",
    borderRadius: 10,
    marginBottom: 10,
  },
  item: {
    fontSize: 20,
    padding: 20,
  },
  itemRating: {
    gap: 4,
    right: 10,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
