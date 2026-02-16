import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Карталардын маалыматы
const MY_CARDS = [
  { id: '1', type: 'VISA Gold', number: '**** 1234', balance: '45 000', color: '#1A1A1A' },
  { id: '2', type: 'Элкарт', number: '**** 5678', balance: '12 300', color: '#2ECC71' },
  { id: '3', type: 'Mastercard', number: '**** 9012', balance: '1 500', color: '#3498db' },
];

export default function CardsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Менин карталарым</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle-outline" size={26} color="#2ECC71" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MY_CARDS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.color }]}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.cardBank}>
                  SaNabi <Text style={{ fontWeight: '400' }}>BANK</Text>
                </Text>
                <Text style={styles.cardType}>{item.type}</Text>
              </View>
              <MaterialCommunityIcons name="integrated-circuit-chip" size={32} color="#FFD700" />
            </View>
            
            <Text style={styles.cardNumber}>{item.number}</Text>
            
            <View style={styles.cardBottom}>
              <View>
                <Text style={styles.balanceLabel}>Баланс</Text>
                <Text style={styles.balanceText}>{item.balance} сом</Text>
              </View>
              {/* Бул жерде 'as any' катаны толугу менен жок кылат */}
              <MaterialCommunityIcons 
                name={item.type.includes('VISA') ? "visa" : "credit-card-outline" as any} 
                size={38} 
                color="white" 
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  addBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 25,
    padding: 22,
    marginBottom: 20,
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardBank: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  cardType: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 },
  cardNumber: { color: 'white', fontSize: 20, letterSpacing: 3, fontWeight: '500' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 2 },
  balanceText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
});