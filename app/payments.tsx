import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';

const CATEGORIES = [
  { id: '1', title: 'Мобилдик байланыш', icon: '📱', color: '#E3F2FD' },
  { id: '2', title: 'Коммуналдык төлөмдөр', icon: '🏠', color: '#E8F5E9' },
  { id: '3', title: 'Интернет жана ТВ', icon: '🌐', color: '#FFF3E0' },
  { id: '4', title: 'Мамлекеттик төлөмдөр', icon: '🏛️', color: '#F3E5F5' },
  { id: '5', title: 'Оюндар жана соцтармактар', icon: '🎮', color: '#FFEBEE' },
];

export default function PaymentsScreen() {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Төлөмдөр</Text>
      </View>

      {/* Издөө талаасы */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Кызматты издөө..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Категориялар */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Text style={{ fontSize: 24 }}>{item.icon}</Text>
            </View>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <Text style={styles.arrow}>❯</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backBtn: { fontSize: 26, color: '#2ecc71', marginRight: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  searchContainer: { padding: 20 },
  searchInput: { backgroundColor: '#F5F5F5', padding: 15, borderRadius: 12, fontSize: 16 },
  categoryItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
  iconBox: { width: 55, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  categoryTitle: { flex: 1, marginLeft: 15, fontSize: 16, fontWeight: '500', color: '#333' },
  arrow: { color: '#CCC', fontSize: 18 }
});