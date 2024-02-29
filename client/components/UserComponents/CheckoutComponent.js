import React, { useState } from "react";
import { Alert, StyleSheet, View, Pressable } from "react-native";
import {
  useStripe,
  Address,
  BillingDetails,
} from "@stripe/stripe-react-native";

export default function CheckoutComponent({
  paymentMethod,
  setPaymentMethod,
  paymentSheetEnabled,
  setPaymentSheetEnabled,
}) {
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } =
    useStripe();
  const [loading, setLoading] = useState(false);

  const choosePaymentOption = async () => {
    const { error, paymentOption } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (paymentOption) {
      setPaymentMethod({
        label: paymentOption.label,
        image: paymentOption.image,
      });
    } else {
      setPaymentMethod(null);
    }
  };

  const onPressBuy = async () => {
    setLoading(true);
    const { error } = await confirmPaymentSheetPayment();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "The payment was confirmed successfully!");
      setPaymentSheetEnabled(false);
    }
    setLoading(false);
  };

  return (
    <>
      <View>
        <Pressable
          variant="primary"
          loading={loading}
          title={"Choose payment method"}
          disabled={!paymentSheetEnabled}
          onPress={choosePaymentOption}
        />
        <Pressable
          variant="primary"
          loading={loading}
          title={"Trigger timeout"}
          disabled={!paymentSheetEnabled}
          onPress={async () => {
            setLoading(true);
            const { error } = await presentPaymentSheet({ timeout: 5000 });
            if (error) {
              Alert.alert(`${error.code}`, error.message);
            }
            setLoading(false);
          }}
        />
      </View>

      <View style={styles.section}>
        <Pressable
          loading={loading}
          disabled={!paymentMethod || !paymentSheetEnabled}
          title={`Buy${paymentMethod ? ` with ${paymentMethod.label}` : ""}`}
          onPress={onPressBuy}
        ></Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
