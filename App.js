import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Comments from './components/Comments'

import Thread from './screens/Thread'
import Home from './screens/Home'
import NewThread from './screens/NewThread';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
          name='Home'
          component={Home}
        />
        <Stack.Screen 
          name='Thread'
          component={Thread}
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
