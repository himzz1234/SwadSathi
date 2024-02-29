import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "expo-router";
import Ionicon from "react-native-vector-icons/Ionicons";
import { truncate } from "../../../utils/index";
import { Image } from "expo-image";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const { auth: user } = useContext(AuthContext);

  const navigateCanteen = async (canteenId) => {
    router.push({
      pathname: `/users/canteen/${canteenId}`,
      params: { canteenId },
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "white",
          paddingHorizontal: 5,
          gap: 10,
          borderRadius: 5,
        }}
      >
        <TextInput
          value={input}
          placeholder="Search in scanned canteens"
          onChangeText={(text) => setInput(text)}
          style={{
            backgroundColor: "transparent",
            borderRadius: 5,
            height: 50,
            fontSize: 16,
            flex: 1,
            paddingHorizontal: 5,
          }}
        />
        <View style={styles.searchIconContainer}>
          <Ionicon name="search" size={20} color="white" />
        </View>
      </View>

      <Text style={{ fontSize: 18, marginTop: 20, fontWeight: 600 }}>
        Scanned Canteens ({user.savedCanteens.length})
      </Text>

      <FlatList
        data={user?.savedCanteens.sort((a, b) => b.isOpen - a.isOpen)}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => {
          if (item.name.toUpperCase().includes(input.toUpperCase())) {
            return (
              <TouchableOpacity
                _id={item._id}
                disabled={!item.isOpen}
                onPress={() => navigateCanteen(item._id)}
                style={[
                  styles.itemContainer,
                  { opacity: item.isOpen ? 1 : 0.3 },
                ]}
              >
                <Image
                  source={item.profilePicture}
                  contentFit="cover"
                  style={{
                    width: 90,
                    height: "100%",
                    borderRadius: 5,
                  }}
                />
                <View style={{ gap: 4 }}>
                  <Text style={styles.item}>{item.name}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Ionicon name="location-sharp" size={15} color="#efcd6a" />
                    <Text style={{ fontSize: 13, fontWeight: "400" }}>
                      {truncate(item.address, 25)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingTop: 5,
    paddingHorizontal: 20,
    color: "blue",
  },
  itemContainer: {
    height: 110,
    position: "relative",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
  item: {
    fontSize: 17,
    fontWeight: "500",
  },
  searchIconContainer: {
    backgroundColor: "#355e4c",
    height: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    borderRadius: 5,
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
