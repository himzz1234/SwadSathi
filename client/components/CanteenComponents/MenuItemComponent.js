import { View, Text, Image } from "react-native";
import React from "react";

export default function MenuItem() {
  return (
    <View
      style={{
        gap: 10,
        padding: 7.5,
        height: 160,
        borderRadius: 5,
        backgroundColor: "#F8F8F8",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ flex: 1, rowGap: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Chicken Pepper
          </Text>
          <Text style={{ fontSize: 15 }}>₹250</Text>
        </View>
        <Image
          source={require("../../assets/images/canteen.jpg")}
          style={{ width: 80, height: 80, borderRadius: 5 }}
        />
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#E5E4E2",
          paddingVertical: 5,
        }}
      >
        <Text>Edit</Text>
      </View>
    </View>
  );
}
