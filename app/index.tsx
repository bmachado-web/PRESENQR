import { SafeAreaProvider } from 'react-native-safe-area-context';
import CheckinScreen from '../src/screens/CheckinScreen';

export default function Index() {
  return (
    <SafeAreaProvider>
      <CheckinScreen />
    </SafeAreaProvider>
  );
}