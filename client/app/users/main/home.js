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
import {
  Svg,
  Defs,
  ClipPath,
  Image as SvgImage,
  Polygon,
} from "react-native-svg";
import Ionicon from "react-native-vector-icons/Ionicons";

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
          backgroundColor: "#f6f6f6",
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <Ionicon name="search-outline" size={20} color="#fe724c" />
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
          }}
        />
      </View>

      <Text style={{ fontSize: 20, marginTop: 20, fontWeight: 600 }}>
        Recently Scanned ({user.savedCanteens.length})
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
                <Svg
                  height="140"
                  width="140"
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  <Defs>
                    <ClipPath id="clip">
                      <Polygon
                        points="140,0 140,200 0,0"
                        fill="lime"
                        stroke="purple"
                        strokeWidth="1"
                        strokeLinejoin="round"
                      />
                    </ClipPath>
                  </Defs>

                  <SvgImage
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    href={require("../../../assets/images/default-restaurant.jpg")}
                    opacity="0.6"
                    clipPath="url(#clip)"
                  />
                </Svg>
                <Text style={styles.item}>{item.name}</Text>
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
    backgroundColor: "white",
    paddingTop: 5,
    paddingHorizontal: 20,
    color: "blue",
  },
  itemContainer: {
    height: 140,
    position: "relative",
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
  },
  item: {
    fontSize: 18,
    padding: 15,
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
