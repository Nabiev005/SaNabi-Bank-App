import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SERVICE_CATS = [
  { id: '1', title: 'Мамлекеттик төлөмдөр', icon: 'bank-outline', color: '#3498db' },
  { id: '2', title: 'Коммуналдык кызматтар', icon: 'home-lightning-bolt-outline', color: '#f1c40f' },
  { id: '3', title: 'Айып пулдар (Штрафтар)', icon: '警車', iconName: 'car-outline', color: '#e74c3c' },
  { id: '4', title: 'Интернет жана ТВ', icon: 'wifi', color: '#9b59b6' },
  { id: '5', title: 'Билим берүү', icon: 'school-outline', color: '#2ecc71' },
];

export default function ServicesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Бардык сервистер</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Категориялар</Text>
        {SERVICE_CATS.map((item) => (
          <TouchableOpacity key={item.id} style={styles.serviceRow}>
            <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
              <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
            </View>
            <Text style={styles.serviceText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        ))}
        
        <View style={styles.promoCard}>
          <Text style={styles.promoTitle}>SANABI QR менен төлөңүз</Text>
          <Text style={styles.promoDesc}>Ар бир төлөмдөн 5% кешбэк алыңыз</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#1A1A1A' },
  serviceRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 15, marginBottom: 10, elevation: 1 },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  serviceText: { flex: 1, fontSize: 15, fontWeight: '500' },
  promoCard: { backgroundColor: '#1A1A1A', padding: 20, borderRadius: 20, marginTop: 20 },
  promoTitle: { color: '#2ECC71', fontSize: 16, fontWeight: 'bold' },
  promoDesc: { color: '#FFF', opacity: 0.7, marginTop: 5 }
});