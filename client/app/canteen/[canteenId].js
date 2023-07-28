import { useLocalSearchParams } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const Navbar = () => {
  const canteen = useLocalSearchParams();
  console.log(canteen)
  const menuItems = [
    {
      itemName: "Rajma Chawal",
      canteenId: canteen._id,
      itemImage:
        "https://www.secondrecipe.com/wp-content/uploads/2017/08/rajma-chawal-1.jpg",
      itemPrice: 50,
      availability: true,
    },
    {
      itemName: "Chole Chawal",
      canteenId: canteen._id,
      itemImage:
        "https://sardarjidhaba.com/wp-content/uploads/2022/03/407ddd677e8785a9e92ae26460cc7829.jpg",
      itemPrice: 70,
      availability: true,
    },
    {
      itemName: "Vada Pav",
      canteenId: canteen._id,
      itemImage:
        "https://www.cookwithmanali.com/wp-content/uploads/2018/04/Vada-Pav-500x500.jpg",
      itemPrice: 20,
      availability: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <View style={{ display: "flex", gap: 5 }}>
          <Text style={{ fontSize: 24, fontWeight: 600 }}>{canteen.name}</Text>
          <Text style={{ fontSize: 18 }}>{canteen.address}</Text>
        </View>

        <FlatList
          data={menuItems}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 15, width: "100%" }}></View>;
          }}
          style={{ marginTop: 40, gap: 10 }}
          renderItem={({ item }) => {
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
                    style={{ width: 80, height: 80, borderRadius: 5 }}
                  />
                </View>
                <Text style={styles.item}>{item.itemName}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
    paddingHorizontal: 20,
    color: "blue",
  },
});

export default Navbar;
