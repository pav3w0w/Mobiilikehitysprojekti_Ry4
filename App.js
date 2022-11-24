import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, } from 'react-native';
import ThreadMenu from './screens/ThreadMenu'
import Home from './screens/Home'
import NewThread from './screens/NewThread';
import Thread from './screens/Thread';
import React, { useRef } from 'react';

const Stack = createNativeStackNavigator();

function GlobalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        headerShown={false}
        options={{ headerMode: 'none', headerShown: false }}
      />
      <Stack.Screen
        name="Thread"
        component={Thread}
      />
    </Stack.Navigator>
  )
}

function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button
        title="Thread"
        onPress={() => navigation.navigate('Thread', {
          threadId: 'YIkO1keG7yIrFMcvWiUQ'
        })}
      />
      <Button
        title="NewThread"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sulje valikko"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />

    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ThreadMenu" component={ThreadMenu} />
      <Drawer.Screen name="NewThread" component={NewThread} />
    </Drawer.Navigator>
  );
}

export default function App() {

  return (

    <NavigationContainer>
      <GlobalStack />
    </NavigationContainer>


  );
}
