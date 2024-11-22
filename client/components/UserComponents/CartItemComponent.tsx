import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { CartContext } from "@/context/cart/CartContext";
import ToggleQuantity from "../ToggleQuantity";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function CartItem({ item }) {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const { cart, dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(
    cart.find((citem) => citem.id === item.id && citem.type === item.type).qty
  );

  const offset = useSharedValue(0);
  const itemHeight = useSharedValue(110);

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onChange((event) => {
      if (event.translationX < 0) event.translationX = 0;
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      if (offset.value >= 80) {
        offset.value = withTiming(SCREEN_WIDTH);
        itemHeight.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(dispatch)({
              type: "DELETE_ITEM",
              payload: { id: item.id, type: item.type },
            });
          }
        });
      } else offset.value = withSpring(0);
    });

  const gestureAnimatedContainerStyles = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
    };
  });

  const gestureAnimatedItemStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const gestureAnimatedIconStyles = useAnimatedStyle(() => {
    const opacity = withTiming(offset.value < 80 ? 0 : 1);
    return { opacity };
  });

  return (
    <Animated.View style={[gestureAnimatedContainerStyles, styles.container]}>
      <Animated.View
        style={[
          {
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            paddingHorizontal: 25,
          },
          gestureAnimatedIconStyles,
        ]}
      >
        <FeatherIcon name="trash" size={30} color="#840000" />
      </Animated.View>

      <GestureDetector gesture={pan}>
        <Animated.View
          style={[styles.itemContainer, gestureAnimatedItemStyles]}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
          <View style={styles.detailsContainer}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  width: 16,
                  height: 16,
                  borderWidth: 2,
                  borderColor:
                    item.classification === "Veg" ? "#088409" : "#92282a",
                  borderRadius: 2,
                  zIndex: 10,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor:
                      item.classification === "Veg" ? "#088409" : "#92282a",
                    borderRadius: 999,
                  }}
                ></View>
              </View>
            </View>
            <Text style={{ fontWeight: "500" }}>{item.type}</Text>

            <View style={styles.quantityContainer}>
              <ToggleQuantity
                {...{ item, quantity, setQuantity }}
                shouldDispatch={true}
              />
              <Text style={styles.itemPrice}>₹{item.price * quantity}</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = {
  container: {
    position: "relative",
  },
  itemContainer: {
    gap: 12.5,
    padding: 7.5,
    display: "flex",
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "white",
    height: 110,
  },
  imageContainer: {
    width: 100,
    borderRadius: 5,
    backgroundColor: "white",
    height: "100%",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    flex: 1,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    rowGap: 6,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 20,
  },
  quantityButtons: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  quantityButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 22,
    height: 22,
    backgroundColor: "#e3e9e7",
    borderRadius: 999,
  },
  quantityButtonText: {
    fontSize: 13,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
  },
  itemPrice: {
    color: "#355e4c",
    fontWeight: "600",
    fontSize: 16,
  },
};
