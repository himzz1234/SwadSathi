import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderItem from "../../../components/UserComponents/OrderItemComponent";
import { SocketContext } from "../../../context/SocketContext";
import Ionicon from "react-native-vector-icons/Ionicons";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { socket } = useContext(SocketContext);
  const [input, setInput] = useState("");

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
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#f6f6f6",
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <Ionicon name="search-outline" size={20} color="#fe724c" />
        <TextInput
          value={input}
          placeholder="Search by canteen"
          onChangeText={(text) => setInput(text)}
          style={{
            backgroundColor: "transparent",
            borderRadius: 5,
            height: 50,
            fontSize: 16,
            flex: 1,
          }}
        />
      </View>

      <FlatList
        data={orders}
        style={{ marginTop: 20 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          if (item.canteen.name.toUpperCase().includes(input.toUpperCase())) {
            return <OrderItem _id={item._id} {...{ item }} />;
          }
        }}
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
  separator: {
    height: 10,
    width: "100%",
  },
});
