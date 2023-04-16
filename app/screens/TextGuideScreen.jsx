import "react-native-url-polyfill/auto";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spinner from "react-native-loading-spinner-overlay";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_API_URL } from "@env";

const TextGuideScreen = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [output, setOutput] = useState("");

  const handleTextChange = (text) => {
    setInput(text);
    if (text.length > 2) {
      fetch(
        `${MAPBOX_API_URL}${text}.json?country=IN&access_token=${MAPBOX_ACCESS_TOKEN}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.features);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleLocationSelect = (location) => {
    setInput(location.place_name);
    setSuggestions([]);
    handleSendMessage(location.place_name);
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      className="p-3 border-b border-gray-200"
      onPress={() => handleLocationSelect(item)}
    >
      <Text>{item.place_name}</Text>
    </TouchableOpacity>
  );

  const handleSendMessage = async (input) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        "https://travel-india-web.vercel.app/api/generateResponse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: `Give me 4 keypoints on ${input}`,
          }),
        }
      );
      const data = await response.json();
      setOutput(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <Header screenName="Text Guide" />
      <Spinner
        visible={loading}
        textStyle={tw`text-white text-center`}
        overlayColor={"rgba(0,0,0,0.5)"}
        textContent={"Processing..."}
      />
      <View className={"flex-1 p-7 bg-white"}>
        <View className="flex flex-row items-start justify-center ">
          <View className="relative w-full">
            <View className="flex flex-row items-center">
              <TextInput
                className="px-5 py-2 rounded-full bg-gray-50 border-2 border-gray-100 shadow-lg flex-1"
                placeholder="Search a place to get a guide on..."
                value={input}
                onChangeText={handleTextChange}
              />
              <TouchableOpacity
                disabled={output.length === 0}
                onPress={() => {
                  Speech.speak(output);
                }}
                className="p-2"
              >
                <MaterialIcons
                  name="volume-up"
                  size={24}
                  color="rgba(0, 0, 0, 0.5)"
                />
              </TouchableOpacity>
            </View>
            {suggestions.length > 0 && (
              <FlatList
                className="bg-white m-1"
                data={suggestions}
                renderItem={renderSuggestion}
                keyExtractor={(item) => item.id}
                style={tw`shadow-md`}
              />
            )}
          </View>
        </View>

        {output.length > 0 ? (
          <ScrollView>
            <Text className="text-md">{output}</Text>
          </ScrollView>
        ) : (
          <Text className="mt-5 text-gray-400">
            Your response appears here...
          </Text>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default TextGuideScreen;
