import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ icon, title, redirectScreen, description }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(redirectScreen);
      }}
      style={tw`shadow-md`}
      className={"bg-white rounded-lg flex my-3 flex-row items-center"}
    >
      <View className={"pl-3 items-center rounded-l-lg justify-center"}>
        <MaterialIcons name={icon} size={50} color={"#FF5555"} />
      </View>
      <View className={"flex-1 p-3"}>
        <Text
          style={tw`text-lg font-bold text-gray-700 mb-1`}
          className={tw`text-gray-700`}
        >
          {title}
        </Text>
        <Text className={"text-gray-400 text-xs font-semibold"}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResults;
