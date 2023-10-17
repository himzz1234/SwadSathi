import { Text, View, FlatList, Pressable } from "react-native";
import OctIcon from "react-native-vector-icons/Octicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function OrderItem({ item }) {
  const statusColor = () => {
    if (item.orderStatus === "Pending") {
      return "#FAC898";
    }
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
            ID: {item.orderId}
          </Text>
          <Text style={{ marginTop: 5 }}>{item.customerName}'s order</Text>
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
            <Text style={{ fontSize: 16 }}>{item.orderTime.split(" ")[1]}</Text>
            <MaterialCommunityIcon
              name="dots-vertical"
              size={19}
              style={{ marginRight: -6 }}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 5,
            }}
          >
            <OctIcon name="dot-fill" color={statusColor()} size={10} />
            <Text style={{ fontSize: 13 }}>{item.orderStatus}</Text>
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
                <Text style={{ flex: 1, fontSize: 15 }}>{menuItem.name}</Text>
                <Text style={{ fontSize: 15 }}>₹{menuItem.price}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16 }}>
          Total bill:{" "}
          <Text style={{ fontWeight: "600" }}>₹{item.orderCost}</Text>
        </Text>
        <View
          style={{
            gap: 10,
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              flex: 1.5,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: "transparent",
              paddingVertical: 7.5,
              backgroundColor: "#68bd46",
            }}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontSize: 14.5 }}
            >
              ACCEPT
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 0.5,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: "red",
              paddingVertical: 7.5,
            }}
          >
            <Text style={{ textAlign: "center", color: "red", fontSize: 14.5 }}>
              DECLINE
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
