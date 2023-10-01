import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Home() {
  const [input, setInput] = useState("");
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const navigateCanteen = async (canteenId) => {
    router.push({
      pathname: `/canteen/${canteenId}`,
      params: { canteenId },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        placeholder="Search in scanned canteens"
        onChangeText={(text) => setInput(text)}
        style={{
          backgroundColor: "#f6f6f6",
          borderRadius: 5,
          height: 50,
          paddingHorizontal: 10,
          fontSize: 16,
        }}
      />

      <Text style={{ fontSize: 18, marginTop: 20, fontWeight: 600 }}>
        Recently Scanned ({user.savedCanteens.length})
      </Text>

      <FlatList
        data={user.savedCanteens.sort(
          (a, b) => b.workingStatus - a.workingStatus
        )}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => {
          if (item.name.toUpperCase().includes(input.toUpperCase())) {
            return (
              <TouchableOpacity
                disabled={!item.workingStatus}
                onPress={() => navigateCanteen(item._id)}
                style={[
                  styles.itemContainer,
                  { opacity: item.workingStatus ? 1 : 0.3 },
                ]}
              >
                <Text style={styles.item}>{item.name}</Text>
              </TouchableOpacity>
            );
          }
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
    height: 120,
    position: "relative",
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
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
