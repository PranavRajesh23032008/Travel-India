import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { Linking } from "react-native";

const RestaurantOption = ({
  id,
  properties,
  text,
  place_name,
  center,
  context,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${center[1]},${center[0]}`
        )
      }
      style={tw`shadow-md`}
      className={
        "border bg-white border-gray-200 flex rounded-lg flex-row items-center my-3 "
      }
    >
      <View
        className={
          "h-full w-[15%] flex flex-row items-center justify-center bg-red-200 rounded-l-lg"
        }
      >
        <MaterialIcons name={"restaurant"} size={40} color={"#FF5555"} />
      </View>
      <View className="flex-1  p-3">
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          className="text-2xl font-bold mb-1"
        >
          {text}
        </Text>
        <Text className="mb-2 w-[80%]" numberOfLines={1} ellipsizeMode={"tail"}>
          {place_name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          className="text-xs text-red-400 font-semibold"
        >
          {properties.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantOption;
