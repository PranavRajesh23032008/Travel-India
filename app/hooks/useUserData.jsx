import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("currentUser");
        setUserData(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  return userData;
};

export default useUserData;
