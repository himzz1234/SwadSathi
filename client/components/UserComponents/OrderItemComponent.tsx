import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import moment from "moment/moment";
import OctIcon from "react-native-vector-icons/Octicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { truncate } from "../../utils/index";

const OrderItem = ({ item }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.canteenInfo}>
          <Image
            width={45}
            height={45}
            resizeMode="cover"
            style={{ borderRadius: 2 }}
            source={{ uri: item.canteen?.profilePicture }}
          />

          <View style={{ gap: 2 }}>
            <Text style={styles.canteenName}>{item.canteen?.name}</Text>
            <Text style={styles.canteenAddress}>
              {truncate(item.canteen.address, 20)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.orderItemsContainer}>
        <FlatList
          data={!showAll ? item.orderItems.slice(0, 2) : item.orderItems}
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
                  ₹{menuItem.product?.price}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
        />

        {item.orderItems.length > 2 && (
          <TouchableOpacity
            onPress={() => setShowAll(!showAll)}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: "#3843c1", textDecorationLine: "underline" }}>
              {!showAll ? "Show More" : "Show Less"}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeRow}>
            <Text style={styles.dateTimeText}>
              {moment(item.createdAt).format("MMM Do YY, h:mm a")}
            </Text>
          </View>

          <View style={styles.statusContainer}>
            {/* <OctIcon
              name="dot-fill"
              color={statusColor(item.status)}
              size={10}
              style={styles.dotIcon}
            /> */}
            <Text
              style={[
                styles.statusText,
                item.status === "Declined" && {
                  color: "#d1342d",
                  fontWeight: 500,
                },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.totalBillContainer}>
        <Text style={styles.totalBillText}>
          Total Bill:{" "}
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
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
  },
  canteenName: {
    fontWeight: "600",
    fontSize: 16.5,
  },
  canteenAddress: {
    fontWeight: "400",
    fontSize: 13,
    color: "#6e7c89",
  },
  dateTimeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    marginTop: 20,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E5E4E2",
    borderStyle: "dashed",
  },
  dateTimeText: {
    fontSize: 13.5,
  },
  statusContainer: {
    gap: 5,
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
