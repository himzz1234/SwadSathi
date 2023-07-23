import { SafeAreaView, View, Image, Text } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function Sidebar(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View
          style={{
            paddingHorizontal: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/images/default.png")}
          />
          <Text style={{ fontSize: 18, fontWeight: 600 }}>Himanshu</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}
