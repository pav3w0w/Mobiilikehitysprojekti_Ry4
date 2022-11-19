import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Comments from './components/Comments'
import { View, Text, Button, Image } from 'react-native';
import Thread from './screens/Thread'
import Home from './screens/Home'
import NewThread from './screens/NewThread';
import React, { useRef } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



function MyDrawer() {
  return (
  <NavigationContainer>
    <Drawer.Navigator
    screenOptions={{
    headerShown:"true",
    swipeEnabled:"false"
    }}
    >
      <Drawer.Screen
      name="Home"
      component={Home}
      />

      <Drawer.Screen
      name="NewThread"
      component={NewThread}
      />

    </Drawer.Navigator>
    </NavigationContainer>
  );
}


export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerRight: () => (

              <ModalDropdown options={['option 1', 'option 2']} />

            ),
          }}

        />
        <Stack.Screen
          name='Thread'
          component={() => Thread("YIkO1keG7yIrFMcvWiUQ")}
        />
        <Stack.Screen
          name='NewThread'
          component={NewThread}
          options={{
            title: 'NewThread',
            headerTitle: 'Create a new Thread',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
