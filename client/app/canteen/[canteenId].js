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
import axios from "../../axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import MenuItem from "../../components/MenuItem";
import { CartContext } from "../../context/CartContext";
import * as Animatable from "react-native-animatable";

AnimatedPressable = Animatable.createAnimatableComponent(Pressable);

const CanteenDetails = () => {
  const { canteenId } = useLocalSearchParams();
  const [canteen, setCanteen] = useState({});
  const { cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchDetails() {
      const res = await axios.get(`/auth/admin/canteens/${canteenId}`);

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
      <View style={{ marginTop: 10, flex: 1 }}>
        <View>
          <FlatList
            data={canteen.menu}
            style={{ marginTop: 20 }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 10, width: "100%" }}></View>;
            }}
            renderItem={({ item }) => {
              return <MenuItem {...{ item }} />;
            }}
          />
        </View>
      </View>

      {cart.length ? (
        <AnimatedPressable
          animation="bounceInUp"
          onPress={() => router.push("/checkout")}
          style={{
            width: "100%",
            backgroundColor: "#FF4136",
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
