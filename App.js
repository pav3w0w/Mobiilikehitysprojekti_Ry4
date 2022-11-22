import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Comments from './components/Comments'
import { View, Text, Button, Image } from 'react-native';
import Thread from './screens/Thread'
import Home from './screens/Home'
import NewThread from './screens/NewThread';
import React, { useRef } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
const Stack = createNativeStackNavigator();



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
      <Drawer.Screen name="Thread" component={() => Thread("YIkO1keG7yIrFMcvWiUQ")} />
      <Drawer.Screen name="NewThread" component={NewThread} />
    </Drawer.Navigator>
  );
}

export default function App() {

  return (

    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>


  );
}
