import React, { useState } from "react";
import { View, Text, Image, Switch, Pressable } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default function MenuItem({ item }) {
  const [isEnabled, setIsEnabled] = useState(item.isAvailable);
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
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
          <Text style={{ fontSize: 15 }}>₹{item.price}</Text>
        </View>
        <View style={{ width: 80, height: 80 }}>
          {item.image && (
            <Image
              source={{ uri: `${item.image}` }}
              style={{ width: "100%", height: "100%", borderRadius: 5 }}
            />
          )}
        </View>
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

        <Pressable
          style={{
            gap: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#eef5ca",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 2,
          }}
        >
          <MaterialIcon name="edit" size={16} color="#2d7262" />
          <Text style={{ color: "#2d7262" }}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
}
