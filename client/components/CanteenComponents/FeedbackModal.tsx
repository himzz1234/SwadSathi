import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomModal from "../ModalComponent";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import axios from "../../axios";
import { AuthContext } from "@/context/auth/AuthContext";

const emojis = [
  {
    name: "awful",
    url: require("../../assets/images/emojis/awful.png"),
  },
  {
    name: "poor",
    url: require("../../assets/images/emojis/poor.png"),
  },
  {
    name: "neutral",
    url: require("../../assets/images/emojis/neutral.png"),
  },
  {
    name: "good",
    url: require("../../assets/images/emojis/good.png"),
  },
  {
    name: "excellent",
    url: require("../../assets/images/emojis/excellent.png"),
  },
];

export default function FeedbackModal({ openModal, setOpenModal, canteen }) {
  const [comment, setComment] = useState("");
  const [selected, setSelected] = useState(0);
  const { auth: user } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = async () => {
    const feedback = {
      user: user._id,
      canteen: canteen._id,
      rating: selected + 1,
      comment,
    };

    try {
      await axios.post("/auth/canteen/feedback", feedback);
      setSubmitted(true);

      const timeout = setTimeout(() => {
        setOpenModal(false);
        clearTimeout(timeout);
      }, 2000);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <CustomModal openFn={openModal}>
      <View style={styles.container}>
        {submitted ? (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              paddingVertical: 10,
            }}
          >
            <View style={{ width: 250, height: 250 }}>
              <Image
                source={require("../../assets/images/feedback-submitted.png")}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  width: 240,
                  textAlign: "center",
                  lineHeight: 25,
                }}
              >
                Thank you for your valuable feedback!
              </Text>
            </View>
          </View>
        ) : (
          <>
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                Help them improve
              </Text>
              <Text style={{ lineHeight: 23 }}>
                How would you like to describe your experience with them.
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {emojis.map((emoji, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      selected === index
                        ? { borderColor: "#30795b", backgroundColor: "#eaf3f0" }
                        : { borderColor: "lightgray" },
                      {
                        width: 40,
                        height: 40,
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 999,
                      },
                    ]}
                    onPress={() => setSelected(index)}
                  >
                    <Image
                      resizeMode="cover"
                      style={{ width: "100%", height: "100%" }}
                      source={emoji.url}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              <TextInput
                value={comment}
                onChangeText={(text) => setComment(text)}
                multiline={true}
                numberOfLines={6}
                placeholder="Add a message"
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  textAlignVertical: "top",
                  padding: 5,
                }}
              />
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ flex: 1 }}></View>
              <View
                style={{ display: "flex", flexDirection: "row", columnGap: 10 }}
              >
                <TouchableOpacity
                  style={{
                    width: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#eaf3f0",
                    borderRadius: 4,
                  }}
                  onPress={() => setOpenModal(false)}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
                <LinearGradient
                  colors={["#2e7653", "#355e4c"]}
                  style={[styles.cartButton]}
                >
                  <TouchableOpacity onPress={submitFeedback}>
                    <Text style={styles.cartButtonText}>Submit</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </>
        )}
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 15,
    height: "auto",
    display: "flex",
    borderRadius: 5,
    backgroundColor: "white",
    width: Dimensions.get("screen").width - 60,
  },
  cartButton: {
    width: 100,
    padding: 8.5,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "transparent",
    elevation: 2,
  },
  cartButtonText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
});
