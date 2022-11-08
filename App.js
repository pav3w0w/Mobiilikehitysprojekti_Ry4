import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Thread from './screens/Thread'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Thread'>
      <Stack.Screen 
        name='Thread'
        component={Thread}
       /* options={{
          title: 'Thread',
          headerTitle: 'Thread',
        }}*/
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
