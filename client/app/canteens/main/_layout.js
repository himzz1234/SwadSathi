import { View, Image, TouchableOpacity, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

import Sidebar from "../../../components/CanteenComponents/SidebarComponent";

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
            <View
              style={{
                gap: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../../../assets/images/canteen.jpg")}
                  borderRadius={999}
                />
              </TouchableOpacity>
              <View style={{ gap: 2 }}>
                <Text style={{ fontWeight: "500", fontSize: 16 }}>
                  BBQ Mechanic
                </Text>
                <Text style={{ fontSize: 13 }}>Plot 122 Part, Angel St..</Text>
              </View>
            </View>
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
              </TouchableOpacity>
            </View>
          ),
        })}
      ></Drawer.Screen>
      <Drawer.Screen
        name="menu"
        options={({ navigation }) => ({
          headerTitle: "",
          drawerLabel: "Menu",
          headerLeftContainerStyle: { paddingHorizontal: 20 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../../../assets/images/canteen.jpg")}
                borderRadius={999}
              />
            </TouchableOpacity>
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
                source={require("../../../assets/images/canteen.jpg")}
                borderRadius={999}
              />
            </TouchableOpacity>
          ),
        })}
      ></Drawer.Screen>
    </Drawer>
  );
}
