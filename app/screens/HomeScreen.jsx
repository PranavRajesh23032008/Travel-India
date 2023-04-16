import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeScreenOptions from "../components/HomeScreenOptions";
import useUserData from "../hooks/useUserData";
import features from "../JSON/HomescreenFeatures";

const HomeScreen = () => {
  const currentUser = useUserData();
  return (
    <View className={"flex-1 bg-white"}>
      <Header screenName={"Travel India"} />
      <View className={"flex-1"}>
        <Text className="p-5 text-2xl font-bold text-gray-600">
          Welcome back, {currentUser?.displayName} 👋
        </Text>
        <ScrollView className="px-5">
          <View className={"mb-8"}>
            {features.map((feature) => (
              <View className="my-3">
                <Text className="font-semibold px-5 py-3 rounded-t-xl text-xl text-white bg-[#FF5555] ">
                  {feature === features[0]
                    ? "Recommended for you"
                    : feature === features[1]
                    ? "All features"
                    : "Useful Links"}
                </Text>
                <View className=" border-b-2 rounded-b-xl border-l-2 border-r-2 border-gray-200">
                  <ScrollView
                    horizontal={true}
                    className="mx-auto space-x-5 py-3"
                  >
                    {feature.map(
                      ({ icon, title, redirectScreen, url }) => (
                        <HomeScreenOptions
                          key={title}
                          icon={icon}
                          title={title}
                          redirectScreen={redirectScreen}
                          url={url}
                        />
                      )
                    )}
                  </ScrollView>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

export default HomeScreen;
