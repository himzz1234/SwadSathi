import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";

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
  const { user } = useContext(AuthContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 600 }}>
        Recently Scanned
      </Text>

      <FlatList
        data={user.savedCanteens}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              // disabled={!item.workingStatus}
              onPress={() => router.replace(`/canteen/${item._id}`)}
              style={[
                styles.itemContainer,
                { opacity: item.workingStatus ? 1 : 0.5 },
              ]}
            >
              <Text style={styles.item}>{item.name}</Text>

              {/* <View style={styles.itemRating}>
                <Icon name="star" size={10} color="#f5c71a" />
                <Text>3.6</Text>
              </View> */}
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
    paddingTop: 10,
    paddingHorizontal: 20,
    color: "blue",
  },
  itemContainer: {
    height: 80,
    position: "relative",
    marginBottom: 10,
    backgroundColor: "#efeeea",
    borderRadius: 10,
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
