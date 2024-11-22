import React, { useContext, useEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { CartContext } from "@/context/cart/CartContext";
import CustomModal from "../ModalComponent";
import lottieJson from "../../assets/gifs/completed.json";
import LottieView from "lottie-react-native";
import usePushNotifications from "@/hooks/usePushNotifications";
import { NotificationContext } from "@/context/notification/NotificationContext";

export default function CheckoutModal({ openModal }) {
  const router = useRouter();
  const { dispatch } = useContext(CartContext);
  const { expoPushToken } = useContext(NotificationContext);
  const { sendPushNotification } = usePushNotifications();

  const onAnimationFinish = async () => {
    dispatch({ type: "REMOVE_ALL" });
    router.replace("/users/myorders");
    await sendPushNotification(expoPushToken);
  };

  return (
    <CustomModal openFn={openModal}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/blank-ticket.png")}
          resizeMode="cover"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 40,
            padding: 10,
          }}
        >
          <View style={styles.iconContainer}>
            <LottieView
              loop={false}
              source={require("../../assets/gifs/completed.json")}
              autoPlay
              style={{ width: 300, height: 300 }}
              onAnimationFinish={onAnimationFinish}
            />
          </View>
          <View>
            <Text style={styles.title}>Thank you for your order!</Text>
            <Text style={styles.message}>Your payment has been processed</Text>
          </View>
        </ImageBackground>
      </View>
    </CustomModal>
  );
}

const styles = {
  container: {
    height: 400,
    borderRadius: 5,
    backgroundColor: "transparent",
    width: Dimensions.get("window").width - 60,
  },
  iconContainer: {
    marginBottom: -80,
    marginTop: -30,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 16,
    color: "#9e9ea0",
  },
};
