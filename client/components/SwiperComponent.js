import React, { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import NavigationCanteen from "../app/navigation/navigationcanteen";
import NavigationUser from "../app/navigation/navigationuser";

export default function SwiperComponent() {
  const scrollViewRef = useRef();

  const handleSwipe = (event) => {
    console.log("hello");
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(
      offsetX / event.nativeEvent.layoutMeasurement.width
    );
  };
  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleSwipe}
      style={{ flexDirection: "row", flex: 1 }}
      decelerationRate="fast"
    >
      <NavigationCanteen />
      <NavigationUser />
    </ScrollView>
  );
}
