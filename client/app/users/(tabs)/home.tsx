import { useContext, useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { AuthContext } from "@/context/auth/AuthContext";
import Ionicon from "react-native-vector-icons/Ionicons";
import BannerCarousel from "@/components/UserComponents/BannerCarousel";
import CanteenCard from "@/components/CanteenComponents/CanteenCard";

export default function Home() {
  const [input, setInput] = useState("");
  const { auth: user } = useContext(AuthContext);

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

      <BannerCarousel />

      <Text style={{ fontSize: 18, fontWeight: 600, marginTop: -20 }}>
        Scanned Canteens ({user.savedCanteens.length})
      </Text>

      <FlatList
        data={user?.savedCanteens}
        style={{ marginTop: 10 }}
        renderItem={({ item, index }) => {
          return <CanteenCard {...{ item, input }} />;
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
  searchIconContainer: {
    backgroundColor: "#28684d",
    height: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    borderRadius: 5,
  },
});
