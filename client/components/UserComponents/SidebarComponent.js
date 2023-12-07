import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar(props) {
  const { auth: user, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    router.replace("/");
    await AsyncStorage.setItem("auth", "");

    dispatch({ type: "LOGOUT" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView style={styles.scrollView}>
        <View style={styles.userInfoContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: user.profilePicture }}
            borderRadius={999}
          />
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fb6a43",
  },
  scrollView: {
    display: "flex",
    flex: 1,
  },
  userInfoContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "white",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  email: {
    fontSize: 14,
    color: "white",
    marginTop: 3,
  },
  logoutButton: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 4,
    borderTopWidth: 1,
    borderColor: "white",
    color: "#fb6a43",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});
