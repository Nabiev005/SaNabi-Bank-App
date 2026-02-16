import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const TRANSACTIONS = [
  { id: '1', title: 'Globus Market', date: '16 Февраль, 12:45', amount: -1200, category: '🛒' },
  { id: '2', title: 'Айлык акы', date: '15 Февраль, 18:20', amount: 45000, category: '💰' },
  { id: '3', title: 'O! Store', date: '14 Февраль, 10:15', amount: -500, category: '📱' },
  { id: '4', title: 'Которуу: Аманбек А.', date: '13 Февраль, 21:00', amount: -2500, category: '💸' },
  { id: '5', title: 'Яндекс Такси', date: '12 Февраль, 08:30', amount: -180, category: '🚖' },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Аракеттер тарыхы</Text>
      </View>

      <FlatList
        data={TRANSACTIONS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.iconBox}><Text style={{fontSize: 20}}>{item.category}</Text></View>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <Text style={[styles.amount, { color: item.amount > 0 ? '#2ecc71' : '#1a1a1a' }]}>
              {item.amount > 0 ? `+${item.amount}` : item.amount} с.
            </Text>
          </View>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backBtn: { fontSize: 24, marginRight: 20, color: '#2ecc71' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#fcfcfc', padding: 10, borderRadius: 15 },
  iconBox: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemDate: { fontSize: 12, color: '#999' },
  amount: { fontSize: 16, fontWeight: 'bold' }
});