import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import moment from "moment/moment";
import OctIcon from "react-native-vector-icons/Octicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { truncate } from "../../utils/index";

const OrderItem = ({ item }) => {
  const statusColor = (status) => {
    if (status === "Pending") {
      return "#FAC898";
    } else if (status === "Preparing") {
      return "#24963f";
    } else if (status === "Declined") {
      return "#ff0b0b";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.canteenInfo}>
          <Text style={styles.canteenName}>{item.canteen?.name}</Text>
          <Text style={styles.canteenAddress}>
            {truncate(item.canteen.address, 20)}
          </Text>
        </View>

        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeRow}>
            <Text style={styles.dateTimeText}>
              {moment(item.createdAt).format("MMM Do YY, h:mm a")}
            </Text>
            {/* <MaterialCommunityIcon
              name="dots-vertical"
              size={19}
              style={styles.dotsIcon}
            /> */}
          </View>

          <View style={styles.statusContainer}>
            <OctIcon
              name="dot-fill"
              color={statusColor(item.status)}
              size={10}
              style={styles.dotIcon}
            />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderItemsContainer}>
        <FlatList
          data={item.orderItems}
          ItemSeparatorComponent={() => {
            return <View style={styles.itemSeparator}></View>;
          }}
          renderItem={({ item: menuItem }) => {
            return (
              <View style={styles.menuItemContainer} key={menuItem._id}>
                <Text style={styles.menuItemQty}>{menuItem.qty}x</Text>
                <Text style={styles.menuItemName}>
                  {menuItem.product?.name} ({menuItem.orderType})
                </Text>
                <Text style={styles.menuItemPrice}>
                  ₹{menuItem.product.price}
                </Text>
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
        {item.tokenNumber && (
          <Text style={styles.tokenNumberText}>
            Token: <Text style={styles.tokenNumber}>{item.tokenNumber}</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 200,
    borderRadius: 5,
    backgroundColor: "white",
  },
  infoContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  canteenInfo: {
    gap: 2,
  },
  canteenName: {
    fontWeight: "600",
    fontSize: 16,
  },
  canteenAddress: {
    fontWeight: "400",
    fontSize: 13.5,
  },
  dateTimeContainer: {},
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateTimeText: {
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
  dotIcon: {
    marginRight: 1,
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
  itemSeparator: {
    height: 10,
    width: "100%",
  },
  menuItemContainer: {
    flexDirection: "row",
    gap: 10,
  },
  menuItemQty: {
    fontSize: 15,
    color: "#355e4c",
    fontWeight: "500",
  },
  menuItemName: {
    flex: 1,
    fontSize: 15,
  },
  menuItemPrice: {
    fontSize: 15,
  },
  totalBillContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalBillText: {
    fontSize: 16,
  },
  totalBillAmount: {
    fontWeight: "600",
  },
  tokenNumberText: {
    fontSize: 16,
  },
  tokenNumber: {
    fontWeight: "600",
  },
});

export default OrderItem;
