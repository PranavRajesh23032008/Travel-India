import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as Location from "expo-location";
import Spinner from "react-native-loading-spinner-overlay";
import RestaurantOption from "../components/RestaurantOption";
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_API_URL
} from "@env";

const RestaurantAroundMeScreen = () => {
  const [location, setLocation] = useState(null);
  const [nearByRestaurants, setNearbyRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Handle permission denied
      }

      let location = await Location.getCurrentPositionAsync({});
      return location.coords;
    };
    getLocation().then((location) => {
      setLocation(location);
    });
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (location) {
        const response = await fetch(
          `${MAPBOX_API_URL}restaurant.json?proximity=${location.longitude},${location.latitude}&access_token=${MAPBOX_ACCESS_TOKEN}&limit=10000&radius=1000`
        );
        const data = await response.json();
        setNearbyRestaurants(data.features);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [location]);

  return (
    <View className="flex-1 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading restaurants around you..."}
        textStyle={{ color: "white" }}
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
      <Header screenName="Restaurants around me" />
      <View className="flex-1  flex flex-col ">
        <View className={"flex flex-row justify-between m-6 items-center"}>
          <Text className="text-2xl font-bold underline ">
            Top Restaurants Around You:
          </Text>
        </View>
        <ScrollView className="px-6">
          {nearByRestaurants.length > 0 &&
            nearByRestaurants?.map(
              ({ id, properties, text, place_name, center, context }) => (
                <RestaurantOption
                  id={id}
                  properties={properties}
                  text={text}
                  place_name={place_name}
                  center={center}
                  context={context}
                  key={id}
                />
              )
            )}
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

export default RestaurantAroundMeScreen;
