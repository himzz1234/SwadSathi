import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "../../../axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CartContext } from "@/context/cart/CartContext";
import MenuItem from "../../../components/UserComponents/MenuItemComponent";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import Ionicon from "react-native-vector-icons/Ionicons";
import FeedbackModal from "@/components/CanteenComponents/FeedbackModal";
import Animated, { BounceInDown } from "react-native-reanimated";

const AnimatedButton = Animated.createAnimatedComponent(LinearGradient);

const CanteenDetails = () => {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const [canteen, setCanteen] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { canteenId, subscribed } = useLocalSearchParams();

  useEffect(() => {
    async function fetchDetails() {
      const res = await axios.get(`/auth/canteen/canteens/${canteenId}`);
      setCanteen(res.data.canteen);
    }

    fetchDetails();
  }, []);

  return (
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

          <TouchableOpacity style={{ position: "absolute", top: 5, right: 5 }}>
            {subscribed === "true" ? (
              <Ionicon name="notifications-circle" size={30} color="#28684d" />
            ) : (
              <Ionicon name="notifications-circle-outline" size={30} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuHeaderText}>Today's Menu</Text>
          <View style={styles.menuHeaderLine}></View>
        </View>
        <FlatList
          data={canteen.menu}
          style={styles.menuList}
          numColumns={2}
          columnWrapperStyle={styles.menuColumnWrapper}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={styles.menuItemSeparator}></View>
          )}
          renderItem={({ item }) => <MenuItem {...{ item }} />}
          keyExtractor={(item) => item._id}
        />
      </View>

      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: "#2e7653",
          right: -35,
          top: "70%",
          height: 30,
          width: 100,
          transform: [{ rotate: "270deg" }],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
        onPress={() => setOpenModal(true)}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Feedback</Text>
      </TouchableOpacity>

      {cart.length ? (
        <AnimatedButton
          entering={BounceInDown.duration(750)}
          colors={["#2e7653", "#355e4c"]}
          style={styles.cartButton}
        >
          <TouchableOpacity onPress={() => router.push("/users/checkout")}>
            <Text style={styles.cartButtonText}>Go To Cart</Text>
          </TouchableOpacity>
        </AnimatedButton>
      ) : null}

      <FeedbackModal {...{ openModal, setOpenModal, canteen }} />
    </View>
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
    height: 120,
    bottom: -50,
    elevation: 10,
    paddingVertical: 5,
    borderRadius: 10,
    left: -30,
    transform: [{ translateX: 50 }],
    zIndex: 20,
    paddingLeft: 20,
  },
  thumbnail: {
    width: 60,
    height: 60,
    position: "absolute",
    top: -30,
    left: 20,
    borderRadius: 999,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "white",
  },
  canteenName: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 40,
  },
  canteenAddress: {
    fontSize: 13,
    marginTop: 3,
    color: "gray",
  },
  menuContainer: {
    marginTop: 50,
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
    fontSize: 18,
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
