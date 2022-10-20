import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AddPet } from './src/screens/add-pet';
import { EditPet } from './src/screens/edit-pet';
import { PetsList } from './src/screens/pets-list';
import { ViewPet } from './src/screens/view-pet';

export default function App() {
  const Stack = createNativeStackNavigator();

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
