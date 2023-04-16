import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import features from "../JSON/HomescreenFeatures";
import { MaterialIcons } from "@expo/vector-icons";
import SearchResults from "../components/SearchResults";
import { ScrollView } from "react-native";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [allFeatures, setAllFeatures] = useState(features[1]);
  const [filteredFeatures, setFilteredFeatures] = useState(allFeatures);

  return (
    <View className={"flex-1 bg-white"}>
      <Header screenName={"Search"} />
      <View className={"flex-1"}>
        <View
          className={
            "bg-gray-100 m-5 border-2 border-gray-200 space-x-1 p-2 rounded-full flex flex-row items-center mb-3"
          }
        >
          <MaterialIcons
            name={"search"}
            size={25}
            color={"rgba(0, 0, 0, 0.4)"}
          />
          <TextInput
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              const filtered = allFeatures.filter((feature) =>
                feature.title.toLowerCase().includes(text.toLowerCase())
              );
              setFilteredFeatures(filtered);
            }}
            placeholder="Search"
            className="flex-1"
          />
        </View>

        {filteredFeatures.length === 0 ? (
          <View className="flex flex-1 flex-col items-center justify-center">
            <MaterialIcons name={"search-off"} size={100} color={"#FF5555"} />
            <Text className={"text-xs font-bold text-red-500"}>
              There doesnt seem to be any searches for: {search}
            </Text>
          </View>
        ) : (
          <ScrollView className={"pb-8 px-5"}>
            {filteredFeatures.map(
              ({ icon, title, isScreen, redirectScreen, url, description }) => (
                <SearchResults
                  key={title}
                  title={title}
                  icon={icon}
                  isScreen={isScreen}
                  redirectScreen={redirectScreen}
                  url={url}
                  description={description}
                />
              )
            )}
          </ScrollView>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default SearchScreen;
