import { Pressable, StyleSheet, View, FlatList, TextInput } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MenuItem from "../../../components/CanteenComponents/MenuItemComponent";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddItemComponenent from "../../../components/CanteenComponents/AddItemModalComponent";

export default function Menu() {
  const [input, setInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { auth: canteen } = useContext(AuthContext);

  const [canteenMenu, setCanteenMenu] = useState([]);

  useEffect(() => {
    setCanteenMenu(canteen.menu);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        placeholder="Search in menu items"
        onChangeText={(text) => setInput(text)}
        style={{
          backgroundColor: "#f6f6f6",
          borderRadius: 5,
          height: 50,
          paddingHorizontal: 10,
          marginTop: 10,
          fontSize: 16,
        }}
      />

      <FlatList
        data={canteenMenu?.filter((menuItem) =>
          menuItem.name.toUpperCase().includes(input.toUpperCase())
        )}
        style={{ marginVertical: 20 }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 15, width: "100%" }}></View>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <MenuItem _id={item._id} {...{ item }} />}
        keyExtractor={(item) => item._id}
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

      {openModal ? (
        <AddItemComponenent {...{ openModal, setOpenModal, setCanteenMenu }} />
      ) : (
        ""
      )}
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
