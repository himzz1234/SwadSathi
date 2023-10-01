import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar(props) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    await AsyncStorage.setItem("auth-token", "");
    router.push("/login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView style={{ display: "flex", flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/images/profile.jpeg")}
            borderRadius={999}
          />
          <Text style={{ fontSize: 18, fontWeight: 600 }}>{user.name}</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        onPress={logout}
        style={{
          marginHorizontal: 10,
          marginVertical: 20,
          paddingVertical: 10,
          borderRadius: 4,
          backgroundColor: "hsl(1,83%,85%)",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "red",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
