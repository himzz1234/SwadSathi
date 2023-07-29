import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MenuItem({ item }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <View>
        <Image
          source={{ uri: item.itemImage }}
          style={{ width: 100, height: 100, borderRadius: 5 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, display: "flex" }}>
          <Text style={{ fontSize: 17, fontWeight: 600, flex: 1 }}>
            {item.itemName}
          </Text>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "#e9e9e9",
              width: 100,
              borderRadius: 5,
              height: 36,
              gap: 5,
            }}
          >
            <TouchableOpacity
              style={{
                borderRightWidth: 1,
                paddingHorizontal: 10,
                borderRightColor: "#c1bfbf",
              }}
            >
              <Text style={{ fontSize: 20 }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>2</Text>
            <TouchableOpacity
              style={{
                borderLeftWidth: 1,
                paddingHorizontal: 10,
                borderLeftColor: "#c1bfbf",
              }}
            >
              <Text style={{ fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ fontSize: 16 }}>₹{item.itemPrice}</Text>
      </View>
    </View>
  );
}
