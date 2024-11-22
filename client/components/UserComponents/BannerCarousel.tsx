import React from "react";
import { Dimensions, Image, View, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function BannerCarousel() {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Carousel
        style={{ borderRadius: 5 }}
        loop
        width={width - 40}
        height={160}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <Image
            source={require("../../assets/images/carousel/1.jpg")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      />
    </View>
  );
}
