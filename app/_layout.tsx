import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#060810" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </>
  );
}