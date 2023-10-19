import { View, StyleSheet, FlatList, Text } from "react-native";
import OrderItem from "../../../components/CanteenComponents/OrderItemComponent";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../axios";

export default function Home() {
  const { auth: canteen } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`/orders/canteenOrders/${canteen._id}`);
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>All Orders</Text>
      <FlatList
        data={orders}
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
