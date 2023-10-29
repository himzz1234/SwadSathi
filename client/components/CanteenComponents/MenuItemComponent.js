import React, { useState } from "react";
import { View, Text, Image, Switch, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import EditItemComponenent from "./EditItemModalComponent";

export default function MenuItem({ item }) {
  const [openModal, setOpenModal] = useState(false);

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

        <TouchableOpacity
          onPress={() => setOpenModal(true)}
          style={{
            gap: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FF6347",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 4,
          }}
        >
          <MaterialIcon name="edit" size={16} color="white" />
          <Text style={{ color: "white" }}>Edit</Text>
        </TouchableOpacity>
      </View>

      {openModal ? (
        <EditItemComponenent {...{ openModal, setOpenModal, item }} />
      ) : (
        ""
      )}
    </View>
  );
}
