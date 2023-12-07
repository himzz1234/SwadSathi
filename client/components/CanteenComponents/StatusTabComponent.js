import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";

const status = ["All", "Preparing", "Delivered", "Declined"];

export default function StatusTab({ activeTab, setActiveTab }) {
  return (
    <View>
      <FlatList
        data={status}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ width: 15 }}></View>}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setActiveTab(item)} key={index}>
            <Text
              style={[
                activeTab === item && { fontWeight: "600", color: "#fe724c" },
                { fontSize: 18.5 },
              ]}
            >
              {item}
            </Text>
            <View
              style={
                activeTab === item && {
                  height: 2,
                  width: "40%",
                  backgroundColor: "#fe724c",
                }
              }
            ></View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
