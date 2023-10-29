import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderItem from "../../../components/UserComponents/OrderItemComponent";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

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
        renderItem={({ item }) => <OrderItem {...{ item }} />}
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
