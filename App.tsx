import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapboxGL from '@rnmapbox/maps';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AddPet } from './src/screens/add-pet';
import { EditPet } from './src/screens/edit-pet';
import { PetsList } from './src/screens/pets-list';
import { ViewMap } from './src/screens/view-map';
import { ViewPet } from './src/screens/view-pet';

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    MapboxGL.setWellKnownTileServer('Mapbox');
    MapboxGL.setAccessToken("pk.eyJ1IjoiaW9hbmFyaWpuaXRhIiwiYSI6ImNsOWk0cWI3OTBrcWczb28wc2hmc3BnaDMifQ.eCL5l2a_OYd3Oj6EeJVSHA");
    MapboxGL.setConnected(true);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerTitle: "" }} initialRouteName="PetsList" >
          <Stack.Screen options={{ headerShown: false }} name="PetsList" component={PetsList} />
          <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: "#f2f2f2" }, headerShadowVisible: false }}
            name="AddPet" component={AddPet} />
          <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: "#f2f2f2" }, headerShadowVisible: false }}
            name="EditPet" component={EditPet} />
          <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: "#f2f2f2" }, headerShadowVisible: false }}
            name="ViewPet" component={ViewPet} />
          <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: "#f2f2f2" }, headerShadowVisible: false }}
            name="ViewMap" component={ViewMap} />
        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
