import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Тез которуу үчүн жасалма маалыматтар
const CONTACTS = [
  { id: '1', name: 'Апам', phone: '0700112233', color: '#FF80AB' },
  { id: '2', name: 'Иниси', phone: '0555443322', color: '#81D4FA' },
  { id: '3', name: 'Азамат', phone: '0777998877', color: '#A5D6A7' },
  { id: '4', name: 'Нурбек', phone: '0999112233', color: '#FFF59D' },
];

export default function TransferScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    if (phoneNumber && amount) {
      router.push({
        pathname: '/receipt',
        params: { 
          amount: amount, 
          receiver: phoneNumber, 
          date: new Date().toLocaleString('ru-RU') 
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Которуу</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Тез которуу бөлүгү */}
        <Text style={styles.sectionTitle}>Тез которуу</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.contactsScroll}
        >
          {CONTACTS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.contactItem}
              onPress={() => setPhoneNumber(item.phone)}
              activeOpacity={0.7}
            >
              <View style={[styles.avatar, { backgroundColor: item.color }]}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              <Text style={styles.contactName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Киргизүү талаалары */}
        <View style={styles.inputCard}>
          <Text style={styles.label}>Алуучунун номери</Text>
          <TextInput
            style={styles.input}
            placeholder="0XXX XX XX XX"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          
          <View style={styles.divider} />

          <Text style={styles.label}>Сумма (сом)</Text>
          <TextInput
            style={[styles.input, { fontSize: 32, color: '#2ECC71' }]}
            placeholder="0"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#888" />
          <Text style={styles.infoText}>Которуу комиссиясыз аткарылат</Text>
        </View>

        <TouchableOpacity 
          style={[styles.mainBtn, { backgroundColor: (phoneNumber && amount) ? '#2ECC71' : '#A5D6A7' }]} 
          onPress={handleTransfer}
          disabled={!phoneNumber || !amount}
          activeOpacity={0.8}
        >
          <Text style={styles.mainBtnText}>Которуу</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingTop: 10
  },
  backBtn: { 
    width: 44, 
    height: 44, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginLeft: 20, marginTop: 20, color: '#888' },
  contactsScroll: { paddingLeft: 20, paddingVertical: 15 },
  contactItem: { alignItems: 'center', marginRight: 20 },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 8, 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  avatarText: { fontSize: 22, fontWeight: '700', color: '#FFF' },
  contactName: { fontSize: 13, fontWeight: '600', color: '#444' },
  inputCard: { 
    backgroundColor: '#FFF', 
    marginHorizontal: 20, 
    padding: 20, 
    borderRadius: 25, 
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  label: { fontSize: 13, color: '#AAA', fontWeight: '600', marginBottom: 5 },
  input: { fontSize: 18, fontWeight: '700', paddingVertical: 10, color: '#1A1A1A' },
  divider: { height: 1, backgroundColor: '#F5F5F5', marginVertical: 15 }, // "my: 15" катасы оңдолду
  infoBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 },
  infoText: { fontSize: 12, color: '#AAA', marginLeft: 5 },
  mainBtn: { 
    margin: 20, 
    height: 65, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 8,
    shadowColor: '#2ECC71',
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  mainBtnText: { color: '#FFF', fontSize: 18, fontWeight: '800' }
});