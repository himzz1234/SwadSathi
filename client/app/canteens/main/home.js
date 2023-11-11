import axios from "../../../axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { View, StyleSheet, FlatList } from "react-native";
import { SocketContext } from "../../../context/SocketContext";
import OrderItem from "../../../components/CanteenComponents/OrderItemComponent";
import StatusTab from "../../../components/CanteenComponents/StatusTabComponent";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const { socket } = useContext(SocketContext);
  const [activeTab, setActiveTab] = useState("All");
  const { auth: canteen } = useContext(AuthContext);

  useEffect(() => {
    socket.on("new-order", (data) => {
      setOrders((prev) => [data.order, ...prev]);
    });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`/orders/canteenOrders/${canteen._id}`);
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <StatusTab {...{ activeTab, setActiveTab }} />
      <FlatList
        data={
          activeTab == "All"
            ? orders
            : orders.filter((item) => item.status === activeTab)
        }
        style={{ marginTop: 20 }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 15, width: "100%" }}></View>;
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
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
