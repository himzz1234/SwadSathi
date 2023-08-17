import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import axios from "../../axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import MenuItem from "../../components/MenuItem";
import { CartContext } from "../../context/CartContext";

const CanteenDetails = () => {
  const { canteenId } = useLocalSearchParams();
  const [canteen, setCanteen] = useState({});
  const { cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchDetails() {
      const res = await axios.get(`/auth/admin/getcanteendetails/${canteenId}`);

      setCanteen(res.data);
    }

    fetchDetails();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ width: "20%" }}
          onPress={() => {
            router.back();
          }}
        >
          <Icon name="arrow-left" size={15} color="black" />
        </TouchableOpacity>
        <View style={{ width: "60%" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {canteen.name}
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center", marginTop: 5 }}>
            {canteen.address}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20, flex: 1 }}>
        <View>
          <FlatList
            data={canteen.menu}
            style={{ marginTop: 20 }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 15, width: "100%" }}></View>;
            }}
            renderItem={({ item }) => {
              return <MenuItem {...{ item }} />;
            }}
          />
        </View>
      </View>

      {cart.length ? (
        <TouchableOpacity
          onPress={() => router.push("/checkout")}
          style={{
            width: "100%",
            backgroundColor: "#FFC300",
            paddingVertical: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>Go To Cart</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 40,
    paddingHorizontal: 20,
    color: "blue",
    display: "flex",
  },
});

export default CanteenDetails;
