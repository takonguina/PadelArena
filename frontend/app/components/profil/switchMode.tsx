import React, { useState, useEffect } from 'react';
import { Switch, StyleSheet } from 'react-native';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from '../../theme/themed';

export default function SwitchMode() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const saveColorMode = async (value: string) => {
    try {
      await AsyncStorage.setItem('colorMode', value);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    const appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      appearanceListener.remove();
    };
  }, []);

  const toggleDarkMode = () => {
    const newColorScheme = isDarkMode ? 'light' : 'dark';
    Appearance.setColorScheme(newColorScheme);
    saveColorMode(newColorScheme);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</Text>
          {isDarkMode ? (
            <Text style={styles.emoji}>🌙</Text>
          ) : (
            <Text style={styles.emoji}>☀️</Text>
          )}
        </View>
        <Switch onValueChange={toggleDarkMode} value={isDarkMode} />
      </View>
    </View>
  );
};


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginRight: 8,
      fontSize: 18,
    },
    emoji: {
      fontSize: 20,
    },
  });