import { View, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View
      style={tw`shadow-md`}
      className="bg-white flex flex-row items-center justify-between"
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="p-6 mx-auto border-t-4 border-[#FF5555]"
      >
        <Ionicons name="home" size={30} color="#FF5555" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        className="p-6 mx-auto border-t-4 border-[#FF5555]"
      >
        <FontAwesome name="search" size={32} color="#FF5555" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        className="p-6 mx-auto border-t-4 border-[#FF5555]"
      >
        <FontAwesome5 name="user-alt" size={31} color="#FF5555" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
