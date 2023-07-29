import { View, Image, TouchableOpacity } from "react-native";
import { Drawer } from "expo-router/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

import Sidebar from "../../components/Sidebar";

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="home"
        options={({ navigation }) => ({
          headerTitle: "",
          drawerLabel: "Home",
          headerLeftContainerStyle: { paddingHorizontal: 20 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../../assets/images/default.png")}
              />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            paddingHorizontal: 20,
          },
          headerRight: () => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <TouchableOpacity style={{ position: "relative" }}>
                <Icon name="notifications-none" size={30} color="black" />
                {/* <View
                  style={{
                    position: "absolute",
                    backgroundColor: "red",
                    width: 12,
                    height: 12,
                    top: 0,
                    right: 5,
                    borderRadius: 999,
                  }}
                ></View> */}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("scanner")}>
                <Icon name="qr-code-scanner" size={30} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="settings"
        options={({ navigation }) => ({
          headerTitle: "",
          drawerLabel: "Settings",
          headerLeftContainerStyle: { paddingHorizontal: 20 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../../assets/images/default.png")}
              />
            </TouchableOpacity>
          ),
        })}
      ></Drawer.Screen>
    </Drawer>
  );
}
