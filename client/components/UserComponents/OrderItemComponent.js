import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import moment from "moment/moment";
import OctIcon from "react-native-vector-icons/Octicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function OrderItem({ item }) {
  const statusColor = (status) => {
    if (status === "Pending") {
      return "#FAC898";
    }
  };

  const truncate = (str) => {
    if (str.length <= 20) {
      return str;
    } else return str.slice(0, 10) + "...";
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
        <View style={{ gap: 2 }}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            {item.canteen.name}
          </Text>
          <Text style={{ fontWeight: "400", fontSize: 13.5 }}>
            {truncate(item.canteen.address)}
          </Text>
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
            <OctIcon
              name="dot-fill"
              color={statusColor(item.status)}
              size={10}
            />
            <Text style={{ fontSize: 13 }}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
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
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Text style={{ fontSize: 15 }}>{menuItem.qty}x</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>
                  {menuItem.product.name}
                </Text>
                <Text style={{ fontSize: 15 }}>₹{menuItem.product.price}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16 }}>
          Total bill:{" "}
          <Text style={{ fontWeight: "600" }}>₹{item.totalPrice}</Text>
        </Text>
      </View>
    </View>
  );
}
