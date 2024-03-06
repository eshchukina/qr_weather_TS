import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Grid, Icon, SearchBar } from '@ant-design/react-native'

import AsyncStorage from "@react-native-async-storage/async-storage";
import WeatherItem from "../WeatherItem";
import Arrow from "react-native-vector-icons/Ionicons";
import Del from "react-native-vector-icons/Feather";
import Spinner from "../Spinner";

import styles from "./styles";

interface WeatherData {
  datetime: string;
  temp: number;
  tempmax: number;
  tempmin: number;
  precipprob: number;
  windspeed: number;
  windgust: number;
  description: string;
  icon: string;
}

const WeatherScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [weatherDataLoading, setWeatherDataLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation);
    }
  }, [selectedLocation]);

  const removeWord = async (location: string) => {
    try {
      const updatedWords = savedLocations.filter((item) => item !== location);
      setSavedLocations(updatedWords);
      await AsyncStorage.setItem("scannedSaveData", JSON.stringify(updatedWords));
    } catch (error) {
      console.error("Error removing word:", error);
    }
  };

  const fetchWeatherData = async (location: string) => {
    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=U9A8E5E5BQ3ZZZCL32MLDUKPR`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleNoSavedLocations = async () => {
    try {
      const defaultLocation = "Moscow,Ru";
      await fetchWeatherData(defaultLocation);
      setSelectedLocation(defaultLocation);
    } catch (error) {
      console.error("Error handling no saved locations:", error);
    }
  };

  const fetchSavedLocations = async () => {
    try {
      const savedLocationsJSON = await AsyncStorage.getItem("scannedSaveData");
      if (savedLocationsJSON) {
        const locations = JSON.parse(savedLocationsJSON) as string[];
        setSavedLocations(locations);
        if (locations.length > 0) {
          setSelectedLocation(locations[0]);
          fetchWeatherData(locations[0]);
        } else {
          handleNoSavedLocations();
        }
      } else {
        handleNoSavedLocations();
      }
    } catch (error) {
      console.error("Error fetching saved locations:", error);
    }
  };

  const handleLocationPress = (location: string) => {
    setWeatherData(null);
    setSelectedLocation(null);
    setWeatherDataLoading(true);
    fetchWeatherData(location)
      .then(() => {
        setSelectedLocation(location);
        setWeatherDataLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherDataLoading(false);
      });
  };

  if (weatherDataLoading || !weatherData) {
    return <Spinner source={require("../../assets/images/qr_spinner.gif")} />;
  }

  const { days } = weatherData as { days: WeatherData[] };

  return (
    <View style={styles.container}>
      <View style={styles.containerList}>
        {savedLocations.length > 2 && (
          <Text>
            <Arrow name="arrow-back" size={20} color="#faedcd" />
            
          </Text>
        )}

        <FlatList
        
          horizontal
          data={savedLocations.length > 0 ? savedLocations : ["Moscow,Ru"]}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onPress={() => handleLocationPress(item)}
                style={styles.buttonContainer}
              >
                <Text
                  style={
                    selectedLocation === item
                      ? styles.selectedLocationText
                      : styles.locationText
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>

              {savedLocations.length > 0 && (
                <TouchableOpacity
                  onPress={() => removeWord(item)}
                  style={styles.buttonContainerDel}
                >
                  <Text>
                    <Del name="delete" size={20} color="#313857" />

                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
          keyExtractor={(index) => index.toString()}
        />
        {savedLocations.length > 2 && (
          <Text>
            <Arrow name="arrow-forward" size={20} color="#faedcd" />
          </Text>
        )}
      </View>

      <FlatList
        data={days}
        renderItem={({ item }) => <WeatherItem item={item} />}
        keyExtractor={(item) => item.datetime}
      />
    </View>
  );
};

export default WeatherScreen;
