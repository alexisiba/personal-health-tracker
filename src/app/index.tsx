import { Redirect } from 'expo-router';


export default function Index() {
  const hasCompletedOnboarding = false;

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding/register" />;
  }

  return <Redirect href="/(tabs)" />;
}