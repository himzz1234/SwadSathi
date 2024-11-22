import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../../axios";
import { AuthContext } from "@/context/auth/AuthContext";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AntIcon from "react-native-vector-icons/AntDesign";
import { LineChart } from "react-native-gifted-charts";

const dynamicBackground = (rating: number) => {
  switch (rating) {
    case 5:
      return "#234f1e";
    case 4:
      return "#234f1e";
    case 3:
      return "#048a0f";
    case 2:
      return "#f2842c";
    case 1:
      return "#f2842c";
  }
};

export default function analytics() {
  const [graphData, setGraphData] = useState([]);
  const { auth: canteen } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);

  const ordersTable = {
    tableHead: ["Item", "Amount"],
    tableData: analytics?.topOrders.map((order) => {
      return [order.item.name, `₹${order.count * order.item.price}`];
    }),
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await axios.get(`/auth/canteen/getAnalytics/${canteen._id}`);
      setAnalytics(res.data);
      setGraphData(
        res.data.dailyOrders.map((day) => {
          return {
            value: day.totalOrders,
          };
        })
      );
    };

    fetchAnalytics();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#e7ecf0",
            flex: 1,
            padding: 10,
            gap: 4,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "600" }}>
            {analytics?.totalOrders[0].count || 0}
          </Text>
          <Text>total orders</Text>
        </View>

        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#e7ecf0",
            flex: 1,
            padding: 10,
            gap: 4,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "600" }}>
            ₹{analytics?.totalOrders[0].totalAmount || 0}
          </Text>
          <Text>worth orders</Text>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <LineChart data={graphData} areaChart curved />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Top Items</Text>
        <Table style={{ marginTop: 15 }}>
          <Row
            data={ordersTable.tableHead}
            flexArr={[2, 1]}
            style={styles.head}
            textStyle={[styles.text, { fontWeight: "600" }]}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={ordersTable.tableTitle}
              style={styles.title}
              heightArr={[28, 28]}
              textStyle={styles.text}
            />
            <Rows
              data={ordersTable.tableData}
              flexArr={[2, 1, 1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Recent Feedbacks
        </Text>
        <View style={{ marginTop: 15 }}>
          <FlatList
            data={analytics?.feedbacks}
            ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                  columnGap: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 4,
                    backgroundColor: dynamicBackground(item.rating),
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    borderRadius: 2,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 13 }}>
                    {item.rating}
                  </Text>
                  <AntIcon name="star" size={13} color="white" />
                </View>
                <Text style={{ fontSize: 16, fontWeight: 500 }}>
                  {item.comment}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    position: "relative",
    paddingHorizontal: 20,
  },
  head: { height: 40, backgroundColor: "#e7ecf0", paddingLeft: 10 },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 36, paddingLeft: 10 },
  text: { textAlign: "left", fontSize: 16 },
});
