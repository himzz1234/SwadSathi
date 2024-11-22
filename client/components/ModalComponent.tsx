import { View, Text, Modal } from "react-native";
import React from "react";

export default function ModalComponent({ children, openFn }) {
  return (
    <Modal
      transparent={true}
      visible={openFn}
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
        {children}
      </View>
    </Modal>
  );
}
