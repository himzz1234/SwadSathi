import { Dimensions, Modal, Pressable, View, Text } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import axios from "../../axios";
import { useState, useEffect } from "react";

export default function Payment({ showPayment }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const initializePaymentSheet = async () => {
    const resp = await axios.post("/orders/checkout");
    const { paymentIntent, ephemeralKey, customer } = resp.data;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,

      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <Modal
      transparent={true}
      visible={showPayment}
      onRequestClose={() => {
        console.log("Modal has been closed.");
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <View
          style={{
            width: Dimensions.get("screen").width,
            height: 300,
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
              console.log("cardDetails", cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
            }}
          />

          <Pressable
            onPress={openPaymentSheet}
            style={{ backgroundColor: "#FF4136", padding: 15, borderRadius: 5 }}
          >
            <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>
              Make your payment
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
