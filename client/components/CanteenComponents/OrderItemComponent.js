import React, { useState, useEffect, useContext } from "react";
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
import { SocketContext } from "../../context/SocketContext";
import { AuthContext } from "../../context/AuthContext";

export default function OrderItem({ item, orders, setOrders }) {
  const { socket } = useContext(SocketContext);
  const [status, setStatus] = useState("Pending");
  const { auth: canteen } = useContext(AuthContext);

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
    const res = await axios.put(`/orders/order/${item._id}`, {
      status: "Preparing",
    });

    const updatedOrders = orders.map((orderItem) => {
      if (orderItem._id === item._id) {
        return { ...orderItem, status: "Preparing" };
      }

      return orderItem;
    });

    socket.emit("order-accept", {
      senderId: canteen._id,
      receiverId: item.user._id,
      message: "Your order has been accepted!",
      order: res.data.order,
    });

    setOrders(updatedOrders);
    setStatus("Preparing");
  };

  const declineOrder = async () => {
    const res = await axios.put(`/orders/order/${item._id}`, {
      status: "Declined",
    });

    const updatedOrders = orders.map((orderItem) => {
      if (orderItem._id === item._id) {
        return { ...orderItem, status: "Declined" };
      }

      return orderItem;
    });

    socket.emit("order-decline", {
      senderId: canteen._id,
      receiverId: item.user._id,
      message: "Your order has been declined!",
      order: res.data.order,
    });

    setOrders(updatedOrders);
    setStatus("Declined");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          {item.tokenNumber ? (
            <Text style={styles.tokenText}>Token: {item.tokenNumber}</Text>
          ) : null}
          <Text style={item.tokenNumber && styles.orderUserText}>
            {item.user.name}'s order
          </Text>
        </View>

        <View>
          <View style={styles.detailsContainer}>
            <Text style={styles.timestampText}>
              {moment(item.createdAt).format("MMM Do YY, h:mm a")}
            </Text>
            <MaterialCommunityIcon
              name="dots-vertical"
              size={19}
              style={styles.dotsIcon}
            />
          </View>
          <View style={styles.statusContainer}>
            <OctIcon name="dot-fill" color={statusColor(status)} size={10} />
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderItemsContainer}>
        <FlatList
          data={item.orderItems}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={({ item: menuItem }) => {
            return (
              <View style={styles.menuItemContainer}>
                <Text style={styles.quantityText}>{menuItem.qty}x</Text>
                <Text style={styles.menuItemText}>{menuItem.product.name}</Text>
                <Text style={styles.priceText}>₹{menuItem.product.price}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      </View>

      <View style={styles.totalBillContainer}>
        <Text style={styles.totalBillText}>
          Total bill:{" "}
          <Text style={styles.totalBillAmount}>₹{item.totalPrice}</Text>
        </Text>
        {status == "Pending" && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={acceptOrder} style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>ACCEPT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={declineOrder}
              style={styles.declineButton}
            >
              <Text style={styles.declineButtonText}>DECLINE</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 200,
    borderRadius: 5,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tokenText: {
    fontWeight: "600",
    fontSize: 16.5,
  },
  orderUserText: {
    marginTop: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timestampText: {
    fontSize: 13.5,
  },
  dotsIcon: {
    marginRight: -6,
  },
  statusContainer: {
    gap: 5,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  statusText: {
    fontSize: 13,
  },
  orderItemsContainer: {
    flex: 1,
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#E5E4E2",
    borderBottomColor: "#E5E4E2",
  },
  separator: {
    height: 10,
    width: "100%",
  },
  menuItemContainer: {
    flexDirection: "row",
    gap: 10,
  },
  quantityText: {
    fontSize: 15,
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
  },
  priceText: {
    fontSize: 15,
  },
  totalBillContainer: {
    padding: 10,
  },
  totalBillText: {
    fontSize: 16,
  },
  totalBillAmount: {
    fontWeight: "600",
  },
  buttonsContainer: {
    gap: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  acceptButton: {
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
  acceptButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  declineButtonText: {
    textAlign: "center",
    color: "red",
    fontSize: 15,
  },
});
