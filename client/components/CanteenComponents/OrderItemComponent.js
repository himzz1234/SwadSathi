import moment from "moment/moment";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import OctIcon from "react-native-vector-icons/Octicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "../../axios";
import { useEffect, useState } from "react";

export default function OrderItem({ item, orders, setOrders }) {
  const [status, setStatus] = useState("Pending");

  const statusColor = () => {
    if (status === "Pending") {
      return "#FAC898";
    } else if (status == "Preparing") {
      return "#24963f";
    } else if (status == "Declined") {
      return "#ff0b0b";
    }
  };

  useEffect(() => {
    setStatus(item.status);
  }, []);

  const acceptOrder = async () => {
    await axios.put(`/orders/order/${item._id}`, {
      status: "Preparing",
    });

    const updatedOrders = orders.map((orderItem) => {
      if (orderItem._id === item._id) {
        return { ...orderItem, status: "Preparing" };
      }

      return orderItem;
    });

    setOrders(updatedOrders);
    setStatus("Preparing");
  };

  const declineOrder = async () => {
    await axios.put(`/orders/order/${item._id}`, {
      status: "Declined",
    });

    const updatedOrders = orders.map((orderItem) => {
      if (orderItem._id === item._id) {
        return { ...orderItem, status: "Declined" };
      }

      return orderItem;
    });

    setOrders(updatedOrders);
    setStatus("Declined");
  };

  return (
    <View
      style={{
        width: "100%",
        minHeight: 200,
        borderRadius: 5,
        backgroundColor: "#F5F5F5",
      }}
    >
      <View
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontWeight: "600", fontSize: 16.5 }}>
            ID: {item._id.slice(-4)}
          </Text>
          <Text style={{ marginTop: 5 }}>{item.user.name}'s order</Text>
        </View>

        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 13.5 }}>
              {moment(item.createdAt).calendar()}
            </Text>
            <MaterialCommunityIcon
              name="dots-vertical"
              size={19}
              style={{ marginRight: -6 }}
            />
          </View>
          <View
            style={{
              gap: 5,
              marginTop: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <OctIcon name="dot-fill" color={statusColor(status)} size={10} />
            <Text style={{ fontSize: 13 }}>{status}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          padding: 10,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: "#E5E4E2",
          borderBottomColor: "#E5E4E2",
        }}
      >
        <FlatList
          data={item.orderItems}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 10, width: "100%" }}></View>;
          }}
          renderItem={({ item: menuItem }) => {
            return (
              <View
                _id={item._id}
                style={{ display: "flex", flexDirection: "row", gap: 10 }}
              >
                <Text style={{ fontSize: 15 }}>{menuItem.qty}x</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>
                  {menuItem.product.name}
                </Text>
                <Text style={{ fontSize: 15 }}>₹{menuItem.product.price}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16 }}>
          Total bill:{" "}
          <Text style={{ fontWeight: "600" }}>₹{item.totalPrice}</Text>
        </Text>
        {status == "Pending" && (
          <View
            style={{
              gap: 10,
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={acceptOrder} style={styles.aceeptButton}>
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 15 }}
              >
                ACCEPT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={declineOrder}
              style={styles.declineButton}
            >
              <Text style={{ textAlign: "center", color: "red", fontSize: 15 }}>
                DECLINE
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  aceeptButton: {
    flex: 1.5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "transparent",
    paddingVertical: 7.5,
    backgroundColor: "#006442",
  },
  declineButton: {
    flex: 0.5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "red",
    paddingVertical: 7.5,
  },
});
