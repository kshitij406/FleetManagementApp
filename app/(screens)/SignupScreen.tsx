import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import auth from '@react-native-firebase/auth';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignup = async () => {
    try {
      setIsSubmitting(true);
      if (!email.trim() || !password) {
        Alert.alert('Sign Up Failed', 'Email and password are required.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Sign Up Failed', 'Passwords do not match.');
        return;
      }
      await auth().createUserWithEmailAndPassword(email.trim(), password);
      router.replace('/(tabs)');
    } catch (err) {
      Alert.alert('Sign Up Failed', 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          Create Account
        </ThemedText>
        <ThemedText style={styles.subtitle}>Get started with your fleet</ThemedText>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={onSignup} disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
          )}
        </Pressable>

        <Pressable style={styles.linkButton} onPress={() => router.back()}>
          <ThemedText style={styles.linkText}>Back to Login</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 12,
    padding: 24,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
    minHeight: 44,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  linkButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkText: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
});
