import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import axios from "../../../axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import MenuItem from "../../../components/UserComponents/MenuItemComponent";
import { CartContext } from "../../../context/CartContext";
import * as Animatable from "react-native-animatable";
import { truncate } from "../../../utils";

AnimatedPressable = Animatable.createAnimatableComponent(Pressable);

const CanteenDetails = () => {
  const { canteenId } = useLocalSearchParams();
  const [canteen, setCanteen] = useState({});
  const { cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchDetails() {
      const res = await axios.get(`/auth/admin/canteens/${canteenId}`);
      setCanteen(res.data.canteen);
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
          <Text style={{ fontSize: 15, textAlign: "center", marginTop: 5 }}>
            {truncate(canteen.address)}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 10, flex: 1 }}>
        <View>
          <FlatList
            data={canteen.menu?.filter((menuItem) => menuItem.isAvailable)}
            style={{ marginTop: 20 }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 10, width: "100%" }}></View>;
            }}
            renderItem={({ item }) => {
              return <MenuItem _id={item._id} {...{ item }} />;
            }}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>

      {cart.length ? (
        <AnimatedPressable
          animation="bounceInUp"
          onPress={() => router.push("/users/checkout")}
          style={{
            width: "100%",
            backgroundColor: "#FF6347",
            paddingVertical: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>
            Go To Cart
          </Text>
        </AnimatedPressable>
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
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    color: "blue",
    display: "flex",
  },
});

export default CanteenDetails;
