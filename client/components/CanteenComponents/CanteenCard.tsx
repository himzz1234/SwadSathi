import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import axios from "@/axios";
import { AuthContext } from "@/context/auth/AuthContext";

interface CanteenCardProps {
  item: any;
  input: string;
}

export default function CanteenCard({ item, input }: CanteenCardProps) {
  const router = useRouter();
  const { auth: user } = useContext(AuthContext);
  const [subscribed, setSubscribed] = useState(item.subscribed);

  const navigateCanteen = async (canteenId: string) => {
    router.push({
      pathname: `/canteens/detail/${canteenId}?subscribed=${subscribed}` as any,
    });
  };

  const subscribeToCanteen = async () => {
    try {
      await axios.put(`/auth/user/subscribeToCanteen/${item.canteen._id}`, {
        userId: user._id,
        isSubscribed: !subscribed,
      });

      const canteen = user?.savedCanteens.find(
        (c) => c.canteen._id == item.canteen._id
      );

      canteen.subscribed = !subscribed;
      setSubscribed((prev) => !prev);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return item.canteen.name.toUpperCase().includes(input.toUpperCase()) ? (
    <TouchableOpacity
      _id={item.canteen._id}
      disabled={!item.canteen.isOpen}
      onPress={() => navigateCanteen(item.canteen._id)}
      style={[styles.itemContainer, { opacity: item.canteen.isOpen ? 1 : 0.3 }]}
    >
      <Image
        source={item.canteen.coverPicture}
        contentFit="cover"
        style={{
          width: "100%",
          height: "70%",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ gap: 4 }}>
          <Text style={styles.item}>{item.canteen.name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13.5,
                fontWeight: "400",
                color: "#6e7c89",
              }}
            >
              {item.canteen.address}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={
            subscribed
              ? {
                  backgroundColor: "#28684d",
                  paddingVertical: 3,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#28684d",
                  width: 90,
                }
              : {
                  paddingVertical: 3,
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: "#6e7c89",
                  width: 90,
                }
          }
          onPress={subscribeToCanteen}
        >
          <Text
            style={[
              { fontSize: 13, textAlign: "center" },
              subscribed && { color: "white" },
            ]}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ) : null;
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 200,
    position: "relative",
    marginBottom: 10,
    borderRadius: 5,
    display: "flex",
    padding: 10,
    gap: 10,
  },
  item: {
    fontSize: 17.5,
    fontWeight: "500",
  },
});
