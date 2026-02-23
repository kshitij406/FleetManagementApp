import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { logFuel } from '@/services/FuelLogService';

export default function LogFuelScreen() {
  const router = useRouter();
  const [assetId, setAssetId] = useState('');
  const [odometer, setOdometer] = useState('');
  const [liters, setLiters] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async () => {
    const success = await logFuel({
        assetId: parseInt(assetId),
        odometerReading: parseInt(odometer),
        liters: parseFloat(liters),
        pricePerLiter: parseFloat(price)
    });

    if (success) {
        Alert.alert("Success", "Fuel logged successfully");
        router.back();
    } else {
        Alert.alert("Error", "Failed to log fuel");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Asset ID</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={assetId} onChangeText={setAssetId} />

      <Text style={styles.label}>Current Odometer (km)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={odometer} onChangeText={setOdometer} />

      <Text style={styles.label}>Liters Filled</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={liters} onChangeText={setLiters} />

      <Text style={styles.label}>Price per Liter</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice} />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Fuel Record</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', paddingTop: 40 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, marginTop: 32, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});