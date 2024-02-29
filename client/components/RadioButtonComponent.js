import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function RadioButtonComponent({ index, selected, setSelected }) {
  return (
    <TouchableOpacity
      onPress={() => setSelected(index)}
      style={[
        {
          height: 22,
          width: 22,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      {selected == index ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: "#355e4c",
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
}
