import moment from "moment";
import axios from "../../../axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { SocketContext } from "../../../context/SocketContext";
import OrderItem from "../../../components/CanteenComponents/OrderItemComponent";
import StatusTab from "../../../components/CanteenComponents/StatusTabComponent";
import { OptimizedFlatList } from "react-native-optimized-flatlist";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const { socket } = useContext(SocketContext);
  const [activeTab, setActiveTab] = useState("All");
  const { auth: canteen } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    socket.on("new-order", (data) => {
      setOrders((prev) => [data.order, ...prev]);
    });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`/orders/canteenOrders/${canteen._id}`);
      setOrders(res.data);
      setCategories([
        ...new Set(
          res.data.map((item) => moment(item.createdAt).format("DD/MM/YYYY"))
        ),
      ]);
    };

    fetchOrders();
  }, []);

  const renderOrdersByDate = ({ item, index }) => {
    if (
      orders.filter((order) => order.status === activeTab || activeTab == "All")
        .length
    )
      return (
        <View key={index}>
          <View style={styles.dateSeparator}>
            <View style={styles.separatorLine}></View>
            <Text>{item}</Text>
            <View style={styles.separatorLine}></View>
          </View>
          <OptimizedFlatList
            data={
              activeTab == "All"
                ? orders
                : orders.filter((item) => item.status === activeTab)
            }
            style={styles.ordersList}
            ItemSeparatorComponent={() => {
              return <View style={styles.orderSeparator}></View>;
            }}
            renderItem={({ item }) => {
              return (
                <OrderItem _id={item._id} {...{ item, orders, setOrders }} />
              );
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
          />
        </View>
      );
  };

  return (
    <View style={styles.container}>
      <StatusTab {...{ activeTab, setActiveTab }} />
      <OptimizedFlatList
        data={categories}
        showsVerticalScrollIndicator={false}
        style={styles.categoriesList}
        ItemSeparatorComponent={() => {
          return <View style={styles.categorySeparator}></View>;
        }}
        renderItem={renderOrdersByDate}
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
  dateSeparator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  separatorLine: {
    height: 2,
    flex: 1,
    backgroundColor: "lightgray",
  },
  ordersList: {
    marginTop: 10,
  },
  orderSeparator: {
    height: 15,
    width: "100%",
  },
  categoriesList: {
    marginTop: 10,
  },
  categorySeparator: {
    height: 15,
    width: "100%",
  },
});
