import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Dimensions, Modal, View, Text } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { CartContext } from "../../context/CartContext";
import axios from "../../axios";

export default function CheckoutModal({ openModal }) {
  const router = useRouter();
  const { cart, dispatch } = useContext(CartContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "REMOVE_ALL" });
      router.replace("/users/main/myorders");
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <Modal
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        console.log("Modal has been closed.");
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <View
          style={{
            gap: 40,
            padding: 20,
            height: 360,
            display: "flex",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            width: Dimensions.get("screen").width - 40,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              display: "flex",
              borderWidth: 10,
              borderRadius: 999,
              alignItems: "center",
              borderColor: "#e9f9f2",
              justifyContent: "center",
              backgroundColor: "#20be79",
            }}
          >
            <MaterialIcon name="done" size={50} color="white" />
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: "#20be79",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Order Placed Successful!
            </Text>

            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 13.5,
                color: "#9e9ea0",
              }}
            >
              Your payment has been processed!
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginTop: 5,
                fontSize: 13.5,
                color: "#9e9ea0",
              }}
            >
              You will be now redirected to your orders page
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
