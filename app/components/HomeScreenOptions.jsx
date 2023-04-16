import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const HomeScreenOptions = ({ title, icon, redirectScreen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
          navigation.navigate(redirectScreen);
      }}
      className={
        "bg-white border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center w-60 h-30 mx-2"
      }
      style={tw`shadow-md`}
    >
      <MaterialIcons name={icon} size={40} color="black" />
      <Text
        className="font-bold text-xl"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeScreenOptions;
