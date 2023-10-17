import { Pressable, StyleSheet, View, FlatList } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MenuItem from "../../../components/CanteenComponents/MenuItemComponent";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddItemComponenent from "../../../components/CanteenComponents/AddItemComponenent";

export default function Menu() {
  const [openModal, setOpenModal] = useState(false);
  const { auth: canteen } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={canteen?.menu}
        ItemSeparatorComponent={() => (
          <View style={{ height: 15, width: "100%" }}></View>
        )}
        render={({ item }) => <MenuItem {...{ item }} />}
      />
      <Pressable
        onPress={() => setOpenModal(true)}
        style={{
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FF6347",
          borderRadius: 999,
          elevation: 3,
          position: "absolute",
          bottom: 30,
          right: 20,
        }}
      >
        <MaterialIcon name="add" size={30} color="white" />
      </Pressable>

      <AddItemComponenent {...{ openModal, setOpenModal }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    paddingHorizontal: 20,
  },
});
