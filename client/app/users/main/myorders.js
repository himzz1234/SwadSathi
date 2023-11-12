import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderItem from "../../../components/UserComponents/OrderItemComponent";
import { SocketContext } from "../../../context/SocketContext";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("order-accepted", (data) => {
      setOrders((prev) => {
        const index = prev.findIndex(
          (prevItem) => prevItem._id === data.order._id
        );

        const updatedOrders = [...prev];
        updatedOrders[index] = {
          ...updatedOrders[index],
          tokenNumber: data.order.tokenNumber,
          status: "Preparing",
        };

        return updatedOrders;
      });
    });

    socket.on("order-declined", (data) => {
      setOrders((prev) => {
        const index = prev.findIndex(
          (prevItem) => prevItem._id === data.order._id
        );

        const updatedOrders = [...prev];
        updatedOrders[index] = {
          ...updatedOrders[index],
          status: "Declined",
        };

        return updatedOrders;
      });
    });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const obj = await AsyncStorage.getItem("auth");
      const { token } = JSON.parse(obj);

      const res = await axios.get("/orders/myorders", { headers: { token } });
      setOrders(res.data.orders);
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ height: 10, width: "100%" }}></View>
        )}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <OrderItem _id={item._id} {...{ item }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
});
