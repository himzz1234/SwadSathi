import React, { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import OnboardingCanteen from "@/app/canteens/onboarding";
import OnboardingUser from "@/app/users/onboarding";

export default function SwiperComponent() {
  const scrollViewRef = useRef();

  const handleSwipe = (event: any) => {
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
      <OnboardingCanteen />
      <OnboardingUser />
    </ScrollView>
  );
}
