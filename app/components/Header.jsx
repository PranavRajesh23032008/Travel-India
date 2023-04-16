import { View, Text, Image } from "react-native";
import React from "react";
import AppLogo from "../assets/icon.png";

const Header = ({ screenName }) => {
  return (
    <View className="flex flex-row items-center bg-white px-7 py-6 border-b-2 border-gray-200">
      <Image source={AppLogo} className="h-7 w-7 mr-1" />
      <Text className="font-bold text-xl text-red-400">{screenName}</Text>
    </View>
  );
};

export default Header;
