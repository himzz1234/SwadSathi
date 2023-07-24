import axios from "axios";
import { View } from "react-native";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth-token");

      if (token) {
        try {
          const res = await axios.get(
            "http://192.168.1.133:3000/api/auth/user/getdetails",
            {
              headers: {
                "auth-token": token,
              },
            }
          );

          console.log(res.data);

          if (res.data) {
            setUser(res.data);
          } else console.log("There was an error!");
        } catch (error) {
          console.log("There was an error!");
        }
      } else console.log("There was an error!");
    };

    fetchUser();
  }, []);

  return <Redirect href={user ? "/profile/home" : "/signup"} />;
}
