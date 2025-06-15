import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import { FIREBASE_DB } from '../screen/FirebaseConfig';

export default function EditService() {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params;

  const [name, setName] = useState(service.name || '');
  const [description, setDescription] = useState(service.description || '');
  const [price, setPrice] = useState(service.price?.toString() || '');
  const [category, setCategory] = useState(service.category || '');

  const handleUpdate = async () => {
    if (!name || !description || !price || !category) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const serviceRef = doc(FIREBASE_DB, 'services', service.id);
      await updateDoc(serviceRef, {
        name,
        description,
        price: parseFloat(price),
        category,
        updatedAt: new Date(),
      });

      Alert.alert('Success', 'Service updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating service:', error);
      Alert.alert('Error', 'Failed to update service');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Service</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Service Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter service name"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Price (THB)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 120,
    backgroundColor: '#002B28',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  updateButton: {
    backgroundColor: '#002B28',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 