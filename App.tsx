import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Info from "./Screens/Info"
 const App =()=>{
   const Stack=createNativeStackNavigator();
 return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Assignment 3" component={Home} />
          <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
    </NavigationContainer>
  );

 }
 export default App;
