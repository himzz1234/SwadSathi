import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pressable, StyleSheet, View, FlatList, TextInput } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import AddItemComponenent from "../../../components/CanteenComponents/AddItemModalComponent";
import MenuItem from "../../../components/CanteenComponents/MenuItemComponent";
import { AuthContext } from "@/context/auth/AuthContext";

export default function Menu() {
  const [input, setInput] = useState("");
  const { auth: canteen } = useContext(AuthContext);

  const [canteenMenu, setCanteenMenu] = useState([]);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["78.5%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );

  useEffect(() => {
    setCanteenMenu(canteen.menu);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={input}
          placeholder="Search in menu items"
          onChangeText={(text) => setInput(text)}
          style={styles.searchInput}
        />
        <View style={styles.searchIconContainer}>
          <Ionicon name="search" size={20} color="white" />
        </View>
      </View>

      <FlatList
        data={canteenMenu?.filter((menuItem) =>
          menuItem.name.toUpperCase().includes(input.toUpperCase())
        )}
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MenuItem _id={item._id} {...{ item, setCanteenMenu }} />
        )}
        keyExtractor={(item) => item._id}
      />

      <Pressable onPress={handlePresentModalPress} style={styles.addButton}>
        <MaterialIcon name="add" size={30} color="#355e4c" />
      </Pressable>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
      >
        <AddItemComponenent {...{ setCanteenMenu }} />
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    position: "relative",
    paddingHorizontal: 20,
  },
  searchContainer: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  searchInput: {
    backgroundColor: "transparent",
    paddingHorizontal: 5,
    fontSize: 16,
    flex: 1,
  },
  searchIconContainer: {
    backgroundColor: "#355e4c",
    height: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    borderRadius: 5,
  },
  flatList: {
    marginVertical: 20,
  },
  separator: {
    height: 15,
    width: "100%",
  },
  addButton: {
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#efcd6a",
    borderRadius: 999,
    elevation: 3,
    position: "absolute",
    bottom: 30,
    right: 20,
  },
});
