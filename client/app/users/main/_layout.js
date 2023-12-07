import React, { useContext } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

import Sidebar from "../../../components/UserComponents/SidebarComponent";
import { useRouter } from "expo-router";
import { AuthContext } from "../../../context/AuthContext";

const Layout = () => {
  const router = useRouter();
  const { auth: user } = useContext(AuthContext);

  const commonHeaderOptions = (navigation) => ({
    headerTitle: "",
    headerStyle: { height: 95 },
    headerLeftContainerStyle: styles.headerLeftContainer,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          style={styles.profileImage}
          source={{ uri: user.profilePicture }}
          borderRadius={999}
        />
      </TouchableOpacity>
    ),
    headerRightContainerStyle: styles.headerRightContainer,
    drawerActiveTintColor: "#fb6a43",
    drawerInactiveTintColor: "white",
    drawerActiveBackgroundColor: "white",
  });

  return (
    <Drawer drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="home"
        options={({ navigation }) => ({
          ...commonHeaderOptions(navigation),
          drawerItemStyle: { fontSize: 20 },
          drawerLabel: "Home",
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.notificationIconContainer}>
                <Icon name="notifications-none" size={30} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/users/scanner")}>
                <Icon name="qr-code-scanner" size={30} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="settings"
        options={({ navigation }) => ({
          ...commonHeaderOptions(navigation),
          drawerLabel: "Settings",
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.notificationIconContainer}>
                <Icon name="notifications-none" size={30} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="myorders"
        options={({ navigation }) => ({
          ...commonHeaderOptions(navigation),
          drawerLabel: "My Orders",
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.notificationIconContainer}>
                <Icon name="notifications-none" size={30} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      ></Drawer.Screen>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  headerRightContainer: {
    paddingHorizontal: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
  },
  notificationIconContainer: {
    position: "relative",
  },
});

export default Layout;
