import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createWorkOrder } from '@/services/WorkOrderService';

export default function ReportIssueScreen() {
  const router = useRouter();
  const [assetId, setAssetId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = async () => {
    const success = await createWorkOrder({
        assetId: parseInt(assetId),
        title: title,
        description: description,
        priority: 'Medium'
    });

    if (success) {
        Alert.alert("Success", "Issue reported successfully");
        router.back();
    } else {
        Alert.alert("Error", "Failed to report issue");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Asset ID</Text>
      <TextInput 
        style={styles.input} 
        keyboardType="numeric" 
        value={assetId} 
        onChangeText={setAssetId} 
        placeholder="Enter Asset ID" 
      />

      <Text style={styles.label}>Issue Title</Text>
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder="e.g. Brakes squeaking" 
      />

      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        multiline 
        value={description} 
        onChangeText={setDescription} 
        placeholder="Provide details" 
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Issue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', paddingTop: 40 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#f44336', padding: 16, borderRadius: 8, marginTop: 32, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});