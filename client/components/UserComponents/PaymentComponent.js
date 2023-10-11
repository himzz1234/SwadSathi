import { Dimensions, Modal, Pressable, View, Text } from "react-native";
import {
  CardField,
  useConfirmPayment,
  useStripe,
} from "@stripe/stripe-react-native";
import axios from "../../axios";

export default function Payment({ showPayment }) {
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    return clientSecret;
  };

  const handlePayPress = async () => {
    const resp = await axios.post("/orders/checkout", {
      currency: "inr",
    });

    const { paymentIntent: clientSecret } = resp.data;

    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails: {
          name: "Himanshu",
          email: "jenny.rosen@example.com",
          phone: "+48888000888",
          addressCity: "Houston",
          addressCountry: "US",
          addressLine1: "1459  Circle Drive",
          addressLine2: "Texas",
          addressPostalCode: "77063",
        },
      },
    });

    if (error) {
      console.log(error);
    } else {
      console.log("Success");
    }

    // const billingDetails = {};
  };

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
            onPress={handlePayPress}
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
