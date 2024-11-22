import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const status = ["All", "Preparing", "Delivered", "Declined"];

export default function StatusTab({ activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={status}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setActiveTab(item)} key={index}>
            <Text
              style={[
                styles.statusText,
                activeTab === item
                  ? { fontWeight: "600", color: "black" }
                  : { color: "#b5b5b5", fontSize: 18 },
              ]}
            >
              {item}
            </Text>
            <View
              style={[
                styles.indicator,
                activeTab === item && {
                  height: 2,
                  width: "40%",
                  alignSelf: "center",
                  backgroundColor: "#2c7656",
                },
              ]}
            ></View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  separator: {
    width: 15,
  },
  statusText: {
    fontSize: 18,
  },
});
