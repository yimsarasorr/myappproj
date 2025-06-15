import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { FIREBASE_DB } from '../screen/FirebaseConfig';

export default function EntrepreneurQuantityScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(FIREBASE_DB, 'user'));
        const filtered = snap.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(u => u.role?.toLowerCase() === 'entrepreneur');

        console.log('✅ Entrepreneurs:', filtered);
        setUsers(filtered);
      } catch (e) {
        console.error('🔥 Error fetching entrepreneurs:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Entrepreneurs</Text>
          <Text style={styles.quantityText}>Total: {users.length}</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#002B28" style={{ marginTop: 40 }} />
      ) : users.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 30, color: '#999' }}>
          ไม่พบผู้ใช้ประเภท Entrepreneur
        </Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.username}>ชื่อ: {item.name || 'N/A'}</Text>
              <Text style={styles.email}>อีเมล: {item.email || 'N/A'}</Text>
              <Text style={styles.email}>เบอร์โทร: {item.phone || '-'}</Text>
            </View>
          )}
        />
      )}

      {/* Bottom Tab */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Admin')}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AddScreen')}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.tabText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('NotificationScreen')}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <Text style={styles.tabText}>Notification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 120,
    backgroundColor: '#002B28',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 13,
    color: '#666',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#002B28',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  tabItem: { alignItems: 'center' },
  tabText: {
    color: 'white',
    fontSize: 12,
    marginTop: 3,
  },
}); 