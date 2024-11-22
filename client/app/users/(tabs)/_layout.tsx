import React, { useContext } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

import Sidebar from "../../../components/UserComponents/SidebarComponent";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/auth/AuthContext";

const Layout = () => {
  const router = useRouter();
  const { auth: user } = useContext(AuthContext);

  const commonHeaderOptions = (navigation) => ({
    headerTitle: "",
    headerStyle: { backgroundColor: "#f3f3f3" },
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
    drawerActiveTintColor: "#355e4c",
    drawerInactiveTintColor: "#eaf3f0",
    drawerActiveBackgroundColor: "#eaf3f0",
    drawerLabelStyle: { fontSize: 15 },
  });

  return (
    <Drawer drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="home"
        options={({ navigation }) => ({
          ...commonHeaderOptions(navigation),
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={24} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Home</Text>
            </View>
          ),
          drawerLabel: "Home",
          drawerIcon: () => (
            <Icon
              name="home"
              size={20}
              style={{ marginRight: -20 }}
              color={navigation.isFocused() ? "#355e4c" : "#eaf3f0"}
            />
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.notificationIconContainer}>
                <Icon name="notifications-none" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/users/scanner")}>
                <Icon name="qr-code-scanner" size={24} color="black" />
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
          drawerIcon: () => (
            <Icon
              name="shopping-cart"
              size={20}
              style={{ marginRight: -20 }}
              color={navigation.isFocused() ? "#355e4c" : "#eaf3f0"}
            />
          ),
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={24} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>My Orders</Text>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.notificationIconContainer}>
                <Icon name="notifications-none" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="settings"
        options={({ navigation }) => ({
          ...commonHeaderOptions(navigation),
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={24} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Settings</Text>
            </View>
          ),
          drawerLabel: "Settings",
          drawerIcon: () => (
            <Icon
              name="settings"
              size={20}
              style={{ marginRight: -20 }}
              color={navigation.isFocused() ? "#355e4c" : "#eaf3f0"}
            />
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.notificationIconContainer}>
                <Icon name="notifications-none" size={24} color="black" />
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
