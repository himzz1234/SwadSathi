import React, { useState } from "react";
import { View, Text, Image, Switch } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default function MenuItem() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            gap: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Switch
            style={{ width: 40 }}
            trackColor={{ false: "#767577", true: "#ff9e8c" }}
            thumbColor={isEnabled ? "#FF6347" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text>In stock</Text>
        </View>

        <View
          style={{
            gap: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcon name="edit" size={16} />
          <Text>Edit</Text>
        </View>
      </View>
    </View>
  );
}
