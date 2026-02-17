import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Тесттик маалыматтар
const TRANSACTIONS = [
  { id: '1', title: 'Глобус "ТЭЦ"', amount: '-1 250', date: 'Бүгүн, 14:20', icon: 'cart-outline', color: '#FF9500' },
  { id: '2', title: 'Котормо: Набиев А.', amount: '+5 000', date: 'Кечээ, 18:45', icon: 'arrow-down-circle-outline', color: '#2ECC71' },
  { id: '3', title: 'О! Мобилдик оператор', amount: '-200', date: '15-февраль', icon: 'cellphone-cog', color: '#3498db' },
  { id: '4', title: 'Яндекс Такси', amount: '-320', date: '14-февраль', icon: 'car-outline', color: '#F1C40F' },
  { id: '5', title: 'Кассадан толуктоо', amount: '+10 000', date: '12-февраль', icon: 'cash-plus', color: '#2ECC71' },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Төлөмдөрдүн тарыхы</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={TRANSACTIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
               {/* 'as any' колдонуу менен иконкадагы катаны алдын алабыз */}
              <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
            </View>
            
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            <Text style={[
              styles.amount, 
              { color: item.amount.startsWith('+') ? '#2ECC71' : '#1A1A1A' }
            ]}>
              {item.amount} сом
            </Text>
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
    padding: 20,
    backgroundColor: '#FFF'
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  filterBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: { flex: 1, marginLeft: 15 },
  title: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  date: { fontSize: 12, color: '#888', marginTop: 2 },
  amount: { fontSize: 16, fontWeight: '700' },
});