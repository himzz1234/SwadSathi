import { View, StyleSheet, FlatList, Text } from "react-native";
import OrderItem from "../../../components/CanteenComponents/OrderItemComponent";

const data = [
  {
    orderId: 123,
    orderTime: "10-10-2023 12:35",
    customerName: "Himanshu",
    orderItems: [
      {
        id: 382939232,
        name: "Rajma Chawal",
        price: 200,
        qty: 4,
      },
      {
        id: 382939233,
        name: "Chole Chawal",
        price: 50,
        qty: 1,
      },
    ],
    orderCost: 250,
    orderStatus: "Pending",
    orderPayment: "Paid",
  },
  {
    orderId: 124,
    orderTime: "10-10-2023 11:35",
    customerName: "Pravs",
    orderItems: [
      {
        name: "Penne Pasta",
        price: 400,
        qty: 1,
      },
      {
        name: "Margherita",
        price: 260,
        qty: 1,
      },
    ],
    orderCost: 660,
    orderStatus: "Pending",
    orderPayment: "Not Paid",
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>All Orders</Text>
      <FlatList
        data={data}
        style={{ marginTop: 20 }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 15, width: "100%" }}></View>;
        }}
        renderItem={({ item }) => {
          return <OrderItem {...{ item }} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
