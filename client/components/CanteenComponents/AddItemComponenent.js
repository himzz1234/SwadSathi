import React, { useState } from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import {
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomModal from "../ModalComponent";

export default function AddItemComponenent({ openModal, setOpenModal }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
  });

  return (
    <CustomModal openFn={openModal}>
      <View
        style={{
          gap: 40,
          height: 500,
          display: "flex",
          borderRadius: 5,
          paddingVertical: 30,
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "white",
          width: Dimensions.get("screen").width - 40,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eef5ca",
          }}
        >
          <Ionicon name="camera" size={40} color="#2d7262" />
        </View>
        <View style={{ width: "100%", flex: 1 }}>
          <TextInput
            placeholder="Name"
            value={formData.name}
            style={styles.inputContainer}
            onChangeText={(e) => setFormData({ ...formData, name: e })}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={[
              {
                backgroundColor: "white",
                borderColor: "crimson",
              },
              styles.button,
            ]}
          >
            <Text
              style={{ color: "crimson", textAlign: "center", fontSize: 16 }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              { backgroundColor: "#006442", borderColor: "transparent" },
              styles.button,
            ]}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    backgroundColor: "#efeeea",
    borderRadius: 5,
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 12.5,
    elevation: 3,
    flex: 1,
  },
});
