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
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Sidebar(props) {
  const router = useRouter();
  const { auth: canteen, dispatch } = useContext(AuthContext);

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
            source={require("../../assets/images/canteen.jpg")}
            borderRadius={999}
          />
          <Text style={styles.userName}>{canteen?.name}</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Icon name="logout" size={20} color="white" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#355e4c",
    paddingHorizontal: 10,
  },
  scrollView: {
    display: "flex",
    flex: 1,
  },
  userInfoContainer: {
    gap: 15,
    marginBottom: 20,
    paddingLeft: 10,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderColor: "white",
    resizeMode: "contain",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    paddingLeft: 5,
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    padding: 10,
    marginVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});
