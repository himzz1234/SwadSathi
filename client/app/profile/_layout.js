import { Image, TouchableOpacity } from "react-native";
import { Drawer } from "expo-router/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
            <TouchableOpacity onPress={() => navigation.navigate("scanner")}>
              <Icon name="qrcode-scan" size={30} color="black" />
            </TouchableOpacity>
          ),
        })}
      ></Drawer.Screen>
    </Drawer>
  );
}
