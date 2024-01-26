import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, ViewStyle } from 'react-native';

interface CustomKeyboardAvoidingViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomKeyboardAvoidingView: React.FC<CustomKeyboardAvoidingViewProps> = ({ children, style }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
      style={[styles.container, style]}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomKeyboardAvoidingView;