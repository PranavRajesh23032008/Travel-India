import React from "react";
import { View, Image } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { onAuthStateChanged } from "firebase/auth";
import LoginImage from "../Images/LoginImage.png";
import { LinearProgress } from "@rneui/base";

const LoadingScreen = () => {
  const navigation = useNavigation();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigation.replace("Home");
    } else {
      navigation.replace("Login");
    }
  });
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
