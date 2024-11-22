import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import axios from "../../../axios";
import OrderItem from "../../../components/UserComponents/OrderItemComponent";
import { SocketContext } from "@/context/socket/SocketContext";
import Ionicon from "react-native-vector-icons/Ionicons";
import { getValueFor } from "@/utils/lib/secure-store";

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

  const searchInOrders = (item) => {
    if (!input) return true;
    const searchByRestuarant = item.canteen.name
      .toLowerCase()
      .includes(input.toLowerCase());
    const searchByDish = item.orderItems.some((orderItem) =>
      orderItem.product.name.toLowerCase().includes(input.toLowerCase())
    );

    if (searchByRestuarant || searchByDish) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const obj = await getValueFor("auth");
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
          backgroundColor: "white",
          paddingHorizontal: 5,
          gap: 10,
          borderRadius: 5,
        }}
      >
        <TextInput
          value={input}
          placeholder="Search by restaurant or dish"
          onChangeText={(text) => setInput(text)}
          style={{
            backgroundColor: "transparent",
            borderRadius: 5,
            height: 50,
            fontSize: 16,
            flex: 1,
            paddingHorizontal: 5,
          }}
        />
        <View style={styles.searchIconContainer}>
          <Ionicon name="search" size={20} color="white" />
        </View>
      </View>

      <FlatList
        data={orders}
        style={{ marginVertical: 20 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          if (searchInOrders(item)) {
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
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  separator: {
    height: 10,
    width: "100%",
  },
  searchIconContainer: {
    backgroundColor: "#355e4c",
    height: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    borderRadius: 5,
  },
});
