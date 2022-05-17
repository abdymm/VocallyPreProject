import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemedContext } from "./contexts/ThemedContext";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState(colorScheme);
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemedContext.Provider value={value}>
          <Navigation colorScheme={theme} />
          <StatusBar />
        </ThemedContext.Provider>
      </SafeAreaProvider>
    );
  }
}
