import React, { useContext, useEffect } from "react";
import { Dimensions, View, Text } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { CartContext } from "../../context/CartContext";
import CustomModal from "../ModalComponent";
import axios from "../../axios";

export default function CheckoutModal({ openModal }) {
  const router = useRouter();
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    if (openModal) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_ALL" });
        router.replace("/users/main/myorders");
      }, 2000);
    }
  }, [openModal]);

  return (
    <CustomModal openFn={openModal}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcon name="done" size={50} color="white" />
        </View>
        <View>
          <Text style={styles.title}>Order Placed Successful!</Text>
          <Text style={styles.message}>Your payment has been processed!</Text>
        </View>
      </View>
    </CustomModal>
  );
}

const styles = {
  container: {
    gap: 40,
    padding: 20,
    height: 360,
    display: "flex",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: Dimensions.get("screen").width - 60,
    position: "relative",
  },
  iconContainer: {
    width: 100,
    height: 100,
    display: "flex",
    borderWidth: 10,
    borderRadius: 999,
    alignItems: "center",
    borderColor: "#e9f9f2",
    justifyContent: "center",
    backgroundColor: "#355e4c",
  },
  title: {
    fontSize: 20,
    color: "#355e4c",
    fontWeight: "500",
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 14.5,
    color: "#9e9ea0",
  },
};
