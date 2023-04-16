import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { onAuthStateChanged } from "firebase/auth";
import AppLogo from "../assets/icon.png";
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
      className={
        "bg-white flex flex-col items-center justify-between flex-1 p-16"
      }
    >
      <View />
      <View>
        <Image source={AppLogo} className={"h-[204px] mx-auto w-[204px]"} />
        <View className="mt-10 p-3 w-72 mx-auto">
          <LinearProgress color="#FB8282" />
        </View>
      </View>
      <Text className="text-3xl font-bold text-[#617888]">Travel India</Text>
    </View>
  );
};

export default LoadingScreen;
