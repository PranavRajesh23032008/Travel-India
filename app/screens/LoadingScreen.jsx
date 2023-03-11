import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { onAuthStateChanged } from "firebase/auth";
import LoginImage from "../Images/LoginImage.png";
import { LinearProgress } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("currentUser");
        if (jsonValue != null) {
          setTimeout(() => {
            navigation.replace("Home");
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.replace("Login");
          }, 2000);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <View
      className={"bg-white flex flex-col items-center justify-center flex-1"}
    >
      <Image source={LoginImage} className={"h-[228px] w-[344px]"} />
      <View className={"mt-10 p-3 w-72"}>
        <LinearProgress color="#FB8282" />
      </View>
    </View>
  );
};

export default LoadingScreen;
