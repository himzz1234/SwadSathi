import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import OctIcon from "react-native-vector-icons/Octicons";
import axios from "../../axios";
import { SocketContext } from "@/context/socket/SocketContext";
import { AuthContext } from "@/context/auth/AuthContext";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

export default function OrderItem({ item, orders, setOrders }) {
  const { socket } = useContext(SocketContext);
  const [status, setStatus] = useState(item.status || "Pending");
  const { auth: canteen } = useContext(AuthContext);

  const date1 = moment(item.createdAt);
  const date2 = moment();

  const [timer, setTimer] = useState(
    Number(300 - date2.diff(date1, "seconds"))
  );

  const statusColor = () => {
    switch (status) {
      case "Pending":
        return "#FAC898";
      case "Preparing":
        return "#24963f";
      case "Declined":
        return "#ff0b0b";
    }
  };

  useEffect(() => {
    if (item.status !== "Pending") return;

    let interval = setInterval(() => {
      setTimer((prev) => {
        const newCount = prev - 1;
        if (newCount == 0) {
          clearInterval(interval);

          declineOrder();
        }

        return newCount;
      });
    }, 1000);

    return () => clearInterval(interval);
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

    const updatedOrders = pendorders.map((orderItem) => {
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
    <View
      style={[
        styles.container,
        timer == 0 ? { opacity: 40 } : { opacity: 100 },
      ]}
    >
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
            <LinearGradient
              colors={timer == 0 ? ["gray", "gray"] : ["#2e7653", "#355e4c"]}
              style={[styles.button]}
            >
              <TouchableOpacity onPress={acceptOrder} style={styles.saveButton}>
                <Text style={styles.acceptButtonText}>
                  ACCEPT 0{Math.floor(timer / 60)}:
                  {Math.floor(timer % 60) < 10
                    ? `0${Math.floor(timer % 60)}`
                    : Math.floor(timer % 60)}
                  s
                </Text>
              </TouchableOpacity>
            </LinearGradient>

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
    backgroundColor: "white",
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
    borderStyle: "dashed",
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
    color: "#2e7653",
    fontWeight: "500",
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
  saveButtonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 4,
    elevation: 5,
    flex: 0.75,
    paddingVertical: 9.5,
  },
  declineButton: {
    flex: 0.25,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#c50009",
    paddingVertical: 7.5,
  },
  acceptButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  declineButtonText: {
    textAlign: "center",
    color: "#c50009",
    fontSize: 15,
  },
});
