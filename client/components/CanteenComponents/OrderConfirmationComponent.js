import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import React from "react";
import OrderItem from "./OrderItemComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default function OrderConfirmationComponent({
  orders,
  pendingOrders,
  setOrders,
}) {
  return (
    <View style={styles.container}>
      {/* <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Icon name="timer-outline" size={20} />
        <Text style={{ fontSize: 14 }}>
          Pending orders are auto declined after 2m30s.
        </Text>
      </View> */}
      <BottomSheetFlatList
        data={pendingOrders}
        style={{ marginTop: 10 }}
        ItemSeparatorComponent={() => {
          return <View style={styles.orderSeparator}></View>;
        }}
        renderItem={({ item }) => {
          return <OrderItem _id={item._id} {...{ item, orders, setOrders }} />;
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 20,
  },
  orderSeparator: {
    height: 15,
    width: "100%",
  },
});
