import moment from "moment";
import axios from "../../../axios";
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { SocketContext } from "@/context/socket/SocketContext";
import OrderItem from "../../../components/CanteenComponents/OrderItemComponent";
import Ionicon from "react-native-vector-icons/Ionicons";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import OrderConfirmationComponent from "../../../components/CanteenComponents/OrderConfirmationComponent";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const { socket } = useContext(SocketContext);
  const [activeTab, setActiveTab] = useState("All");
  const { auth: canteen } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [sheetOpen, setSheetOpen] = useState(-1);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["85%"], []);

  const handleSheetChanges = useCallback((index) => {
    setSheetOpen(index);
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );

  useEffect(() => {
    socket.on("new-order", (data) => {
      setPendingOrders((prev) => [data.order, ...prev]);
    });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`/orders/canteenOrders/${canteen._id}`);
      setOrders(res.data.filter((item) => item.status !== "Pending"));
      setCategories([
        ...new Set(
          res.data.map((item) => moment(item.createdAt).format("DD/MM/YYYY"))
        ),
      ]);

      setPendingOrders(
        res.data.filter((orderItem) => orderItem.status === "Pending")
      );
    };

    fetchOrders();
  }, []);

  const filterOptions = ["All", "Preparing", "Delivered", "Declined"];

  const filteredOrders = orders.filter(
    (order) => order.status === activeTab || activeTab === "All"
  );

  const renderOrdersByDate = ({ item, index }) => {
    const filteredByDate = filteredOrders.filter(
      (orderItem) =>
        item === moment(orderItem.createdAt).format("DD/MM/YYYY") &&
        orderItem.status !== "Pending"
    );

    if (!filteredByDate.length) return;

    return (
      <View key={index}>
        <View style={styles.dateSeparator}>
          <View style={styles.separatorLine}></View>
          <Text style={styles.dateText}>
            {item == moment().format("DD/MM/YYYY") ? "Today" : item}
          </Text>
          <View style={styles.separatorLine}></View>
        </View>

        <FlatList
          data={filteredByDate}
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
      <View
        style={{ paddingTop: 10, paddingBottom: 40, paddingHorizontal: 20 }}
      >
        <View style={styles.tabContainer}>
          <Text style={styles.tabText}>
            {activeTab} Orders ({filteredOrders.length})
          </Text>
          {/* <ModalDropdown
            onSelect={(idx) => setActiveTab(filterOptions[idx])}
            saveScrollPosition={false}
            defaultIndex={0}
            options={filterOptions}
            dropdownStyle={styles.dropdownStyle}
            dropdownTextStyle={styles.dropdownTextStyle}
            dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
          >
            <Ionicon name="options" size={20} style={styles.dropdownIcon} />
          </ModalDropdown> */}
        </View>
        <FlatList
          data={categories}
          showsVerticalScrollIndicator={false}
          style={styles.categoriesList}
          ItemSeparatorComponent={() => {
            return <View style={styles.categorySeparator}></View>;
          }}
          renderItem={renderOrdersByDate}
        />
      </View>

      {pendingOrders.length !== 0 && sheetOpen == -1 && (
        <Pressable
          onPress={handlePresentModalPress}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 95,
            width: "100%",
            backgroundColor: "#355e4c",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            elevation: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 19 }}>
            You have {pendingOrders.length} new order(s)
          </Text>
          <Text style={{ color: "#dcdcdc" }}>Click here to take an action</Text>
        </Pressable>
      )}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
      >
        <OrderConfirmationComponent {...{ orders, pendingOrders, setOrders }} />
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    position: "relative",
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    fontSize: 19,
    fontWeight: "bold",
    flex: 1,
  },
  dropdownStyle: {
    width: 220,
    height: 174,
    elevation: 10,
    borderRadius: 5,
    position: "absolute",
  },
  dropdownTextStyle: {
    fontSize: 17,
    fontWeight: "normal",
  },
  dropdownTextHighlightStyle: {
    color: "#355e4c",
    fontWeight: "bold",
  },
  dropdownIcon: {
    paddingHorizontal: 7.5,
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
  dateText: {
    fontSize: 15,
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
