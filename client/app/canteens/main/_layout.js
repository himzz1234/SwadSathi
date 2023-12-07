import React, { useContext } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { truncate } from "../../../utils";
import Sidebar from "../../../components/CanteenComponents/SidebarComponent";
import { AuthContext } from "../../../context/AuthContext";

export default function Layout() {
  const { auth: canteen } = useContext(AuthContext);

  const CommonHeaderOptions = ({ navigation }) => ({
    headerTitle: "",
    headerLeftContainerStyle: styles.headerLeftContainer,
    headerLeft: () => (
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={styles.profileImage}
            source={require("../../../assets/images/canteen.jpg")}
            borderRadius={999}
          />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{canteen?.name}</Text>
          <Text style={styles.profileAddress}>
            {truncate(canteen?.address)}
          </Text>
        </View>
      </View>
    ),
    headerRightContainerStyle: styles.headerRightContainer,
    headerRight: () => (
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.notificationIcon}>
          <Icon name="notifications-none" size={30} color="black" />
        </TouchableOpacity>
      </View>
    ),
    drawerActiveTintColor: "#fb6a43",
    drawerInactiveTintColor: "white",
    drawerActiveBackgroundColor: "white",
  });

  return (
    <Drawer drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="home"
        options={({ navigation }) => ({
          ...CommonHeaderOptions({ navigation }),
          drawerLabel: "Home",
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="menu"
        options={({ navigation }) => ({
          ...CommonHeaderOptions({ navigation }),
          drawerLabel: "Menu",
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="settings"
        options={({ navigation }) => ({
          ...CommonHeaderOptions({ navigation }),
          drawerLabel: "Settings",
        })}
      ></Drawer.Screen>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
  },
  profileInfo: {
    gap: 2,
  },
  profileName: {
    fontWeight: "500",
    fontSize: 16,
  },
  profileAddress: {
    fontSize: 13,
  },
  headerRightContainer: {
    paddingHorizontal: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  notificationIcon: {
    position: "relative",
  },
});
