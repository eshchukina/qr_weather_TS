import React from "react";
import { View, Text } from "react-native";
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'

import WeatherIcon from "../WeatherIcon";

import styles from "./styles";

interface WeatherItemProps {
  item: {
    datetime: string;
    temp: number;
    tempmax: number;
    tempmin: number;
    precipprob: number;
    windspeed: number;
    windgust: number;
    description: string;
    icon: string;
  };
}

const WeatherItem: React.FC<WeatherItemProps> = ({ item }) => {
  const convertToFahrenheitToCelsius = (fahrenheit: number): number => {
    return Math.round(((fahrenheit - 32) * 5) / 9);
  };

  return (
    
    <Card style={styles.item}>
      
      <Text style={styles.textItem}>Date: {item.datetime}</Text>
      
      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Temperature:</Text>
        <Text style={styles.textItemData}>
          {convertToFahrenheitToCelsius(item.temp)}°C
        </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Max temperature:</Text>
        <Text style={styles.textItemData}>
          {convertToFahrenheitToCelsius(item.tempmax)}°C{" "}
        </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Mix temperature:</Text>
        <Text style={styles.textItemData}>
          {convertToFahrenheitToCelsius(item.tempmin)}°C{" "}
        </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Chance of precipitation:</Text>
        <Text style={styles.textItemData}>{item.precipprob}% </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Wind speed:</Text>
        <Text style={styles.textItemData}>{item.windspeed} mph </Text>
      </View>

      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>Wind gust:</Text>
        <Text style={styles.textItemData}>{item.windgust} mph </Text>
      </View>

      <Text style={styles.textItem}>{item.description}</Text>
      <WeatherIcon icon={item.icon} />
    </Card>
  );
};

export default WeatherItem;
