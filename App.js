import React from 'react';
import {Alert} from "react-native";
import Loading from './Loading';
import Weather from './Weather';
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "d749bca3be8d36d8968e8f4b28fd40e8";

export default class extends React.Component {
  state = {
    isLoading : true
  };
  //fetch하기  api데이터 
  getWeather = async(latitude, longitude) =>{
    const { 
      data: {
        main:{temp},
        weather
      } 
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      condition: weather[0].main, 
      temp
    });

  }
  getLocation = async() =>{
    try {
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      
      //나중에 api를 이용해 날씨를 가져올것이다.
    } catch (error) {
      Alert.alert("Can't find you","so sad");
    }
    
  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition}/>; 
  }
  
}