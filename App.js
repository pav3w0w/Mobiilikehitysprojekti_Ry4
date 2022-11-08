import { StyleSheet, Text, View } from 'react-native';
import VoteButtons from './components/VoteButtons';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <VoteButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
});
