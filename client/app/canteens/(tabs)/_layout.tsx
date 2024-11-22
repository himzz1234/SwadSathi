import React, { useContext } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import Sidebar from "../../../components/CanteenComponents/SidebarComponent";

export default function Layout() {
  const CommonHeaderOptions = ({ navigation }) => ({
    headerTitle: "",
    headerLeftContainerStyle: styles.headerLeftContainer,

    headerStyle: { backgroundColor: "#f3f3f3" },
    headerRightContainerStyle: styles.headerRightContainer,
    headerRight: () => (
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.notificationIcon}>
          <Icon name="notifications-none" size={24} color="black" />
        </TouchableOpacity>
      </View>
    ),
    drawerActiveTintColor: "#87986b",
    drawerInactiveTintColor: "white",
    drawerActiveBackgroundColor: "white",
    drawerLabelStyle: { fontSize: 15 },
  });

  return (
    <Drawer drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="home"
        options={({ navigation }) => {
          return {
            ...CommonHeaderOptions({ navigation }),
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
                color={navigation.isFocused() ? "#87986b" : "white"}
              />
            ),
          };
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="menu"
        options={({ navigation }) => ({
          ...CommonHeaderOptions({ navigation }),
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={24} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Menu</Text>
            </View>
          ),
          drawerLabel: "Menu",
          drawerIcon: () => (
            <Icon
              name="fastfood"
              size={20}
              style={{ marginRight: -20 }}
              color={navigation.isFocused() ? "#87986b" : "white"}
            />
          ),
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="analytics"
        options={({ navigation }) => ({
          ...CommonHeaderOptions({ navigation }),
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={24} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Analytics</Text>
            </View>
          ),
          drawerLabel: "Analytics",
          drawerIcon: () => (
            <Icon
              name="analytics"
              size={20}
              style={{ marginRight: -20 }}
              color={navigation.isFocused() ? "#87986b" : "white"}
            />
          ),
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="settings"
        options={({ navigation }) => ({
          ...CommonHeaderOptions({ navigation }),
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
              color={navigation.isFocused() ? "#87986b" : "white"}
            />
          ),
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
