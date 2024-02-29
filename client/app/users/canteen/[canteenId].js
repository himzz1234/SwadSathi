import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import axios from "../../../axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CartContext } from "../../../context/CartContext";
import MenuItem from "../../../components/UserComponents/MenuItemComponent";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

const AnimatedButton = Animatable.createAnimatableComponent(LinearGradient);

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
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButtonContainer}
        >
          <Icon name="angle-left" size={20} style={styles.backButtonIcon} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={canteen.coverPicture} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Image
              source={{ uri: canteen.profilePicture }}
              style={styles.thumbnail}
              contentFit="cover"
            />
            <Text style={styles.canteenName}>{canteen.name}</Text>
            <Text style={styles.canteenAddress}>{canteen.address}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuHeaderText}>Today's Menu</Text>
            <View style={styles.menuHeaderLine}></View>
          </View>
          <FlatList
            data={canteen.menu?.filter((menuItem) => menuItem.isAvailable)}
            style={styles.menuList}
            numColumns={2}
            columnWrapperStyle={styles.menuColumnWrapper}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={styles.menuItemSeparator}></View>
            )}
            renderItem={({ item }) => <MenuItem _id={item._id} {...{ item }} />}
            keyExtractor={(item) => item._id}
          />
        </View>

        {cart.length ? (
          <AnimatedButton
            animation="bounceInUp"
            colors={["#2e7653", "#355e4c"]}
            style={styles.cartButton}
          >
            <TouchableOpacity onPress={() => router.push("/users/checkout")}>
              <Text style={styles.cartButtonText}>Go To Cart</Text>
            </TouchableOpacity>
          </AnimatedButton>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    display: "flex",
    position: "relative",
  },
  backButtonContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 50,
    backgroundColor: "white",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderColor: "#e3e9e7",
    borderWidth: 2,
  },
  backButtonIcon: {
    color: "black",
  },
  imageContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
  },
  detailsContainer: {
    width: "90%",
    position: "absolute",
    backgroundColor: "white",
    height: 180,
    bottom: -100,
    left: 0,
    elevation: 14,
    display: "flex",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 10,
    left: -30,
    transform: [{ translateX: 50 }],
    zIndex: 20,
  },
  thumbnail: {
    width: 70,
    height: 70,
    position: "absolute",
    top: -30,
    borderRadius: 999,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "white",
  },
  canteenName: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 40,
  },
  canteenAddress: {
    fontSize: 14,
    marginTop: 3,
    color: "gray",
  },
  menuContainer: {
    marginTop: 100,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuHeaderText: {
    fontSize: 19,
    fontWeight: "600",
  },
  menuHeaderLine: {
    width: "60%",
    height: 2,
    backgroundColor: "lightgray",
  },
  menuList: {
    marginTop: 20,
  },
  menuColumnWrapper: {
    justifyContent: "space-between",
  },
  menuItemSeparator: {
    height: 10,
    width: "100%",
  },
  cartButton: {
    width: "90%",
    padding: 15,
    borderRadius: 7.5,
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: "transparent",
    elevation: 2,
  },
  cartButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
});

export default CanteenDetails;
