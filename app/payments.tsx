import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Ар бир категорияга уникалдуу 'type' кошобуз
const CATEGORIES = [
  { id: '1', title: 'Мобилдик байланыш', icon: '📱', color: '#E3F2FD', type: 'mobile' },
  { id: '2', title: 'Коммуналдык төлөмдөр', icon: '🏠', color: '#E8F5E9', type: 'utility' },
  { id: '3', title: 'Интернет жана ТВ', icon: '🌐', color: '#FFF3E0', type: 'internet' },
  { id: '4', title: 'Мамлекеттик төлөмдөр', icon: '🏛️', color: '#F3E5F5', type: 'government' },
  { id: '5', title: 'Оюндар жана соцтармактар', icon: '🎮', color: '#FFEBEE', type: 'games' },
];

export default function PaymentsScreen() {
  const [search, setSearch] = useState('');

  const filteredCategories = CATEGORIES.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtnWrapper}>
          <Ionicons name="arrow-back" size={26} color="#2ecc71" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Төлөмдөр</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Кызматты издөө..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryItem}
            // Динамикалык бетке өтүү жана параметрлерди жиберүү
            onPress={() => router.push({
              pathname: "/services/[id]",
              params: { id: item.id, title: item.title, type: item.type }
            } as any)} 
          >
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Text style={{ fontSize: 24 }}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.categoryTitle}>{item.title}</Text>
              <Text style={styles.categorySubTitle}>Төлөмдөр жана кызматтар</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#CCC" />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#fff',
    elevation: 2, // Android үчүн көлөкө
    shadowColor: '#000', // iOS үчүн көлөкө
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backBtnWrapper: { paddingRight: 15 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#1A1A1A' },
  searchContainer: { padding: 20 },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { 
    flex: 1, 
    paddingVertical: 15, 
    fontSize: 16, 
    color: '#333' 
  },
  categoryItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
  iconBox: { width: 55, height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  textContainer: { flex: 1, marginLeft: 15 },
  categoryTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  categorySubTitle: { fontSize: 13, color: '#888', marginTop: 2 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#888', fontSize: 16 }
});