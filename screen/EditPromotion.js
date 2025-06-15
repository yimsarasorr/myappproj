import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';

const db = getFirestore();

const EditPromotion = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { promoId, existingData } = route.params;

  const [title, setTitle] = useState(existingData?.title || '');
  const [description, setDescription] = useState(existingData?.description || '');
  const [startDate, setStartDate] = useState(existingData?.startDate || '');
  const [endDate, setEndDate] = useState(existingData?.endDate || '');

  const handleUpdate = async () => {
    if (!title || !description || !startDate || !endDate) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      await updateDoc(doc(db, 'Promotions', promoId), {
        title,
        description,
        startDate,
        endDate,
      });
      Alert.alert("Success", "Promotion updated successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Update error: ", error);
      Alert.alert("Error", "Failed to update promotion.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Promotion</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        multiline
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Date (e.g. 2025-06-11)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (e.g. 2025-06-30)"
        value={endDate}
        onChangeText={setEndDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Feather name="check" size={24} color="#fff" />
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#063c2f',
    alignSelf: 'center'
  },
  input: {
    backgroundColor: '#f0f2f2',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#063c2f',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default EditPromotion;
