import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "../../axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import MenuItem from "../../components/MenuItem";

const CanteenDetails = () => {
  const { canteenId } = useLocalSearchParams();
  const [canteen, setCanteen] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function fetchDetails() {
      const res = await axios.get(`/auth/admin/getcanteendetails/${canteenId}`);

      setCanteen(res.data);
    }

    fetchDetails();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={{ display: "flex", gap: 5 }}>
          <Text style={{ fontSize: 24, fontWeight: 600 }}>{canteen.name}</Text>
          <Text style={{ fontSize: 16 }}>{canteen.address}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          {/* <Text style={{ fontSize: 18, fontWeight: 600 }}>
            Menu ({canteen.menu.length})
          </Text> */}
          <FlatList
            data={canteen.menu}
            style={{ marginTop: 20 }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 15, width: "100%" }}></View>;
            }}
            renderItem={({ item }) => {
              return <MenuItem item={item} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
    paddingHorizontal: 20,
    color: "blue",
  },
});

export default CanteenDetails;
