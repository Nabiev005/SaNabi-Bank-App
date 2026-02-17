import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// 1. Категориялардын тизмеси
const SERVICE_CATS = [
  { 
    id: '1', 
    title: 'Мобилдик байланыш', 
    icon: 'cellphone-tower', 
    color: '#9C27B0',
    desc: 'Бирдик толтуруу'
  },
  { 
    id: '2', 
    title: 'Коммуналдык кызматтар', 
    icon: 'home-lightning-bolt-outline', 
    color: '#F1C40F',
    desc: 'Жарык, суу, газ'
  },
  { 
    id: '3', 
    title: 'Интернет жана ТВ', 
    icon: 'wifi', 
    color: '#3498DB',
    desc: 'Акнет, Мегалайн ж.б.'
  },
  { 
    id: '4', 
    title: 'Мамлекеттик төлөмдөр', 
    icon: 'bank-outline', 
    color: '#E74C3C',
    desc: 'Салыктар, штрафтар'
  },
  { 
    id: '5', 
    title: 'Билим берүү', 
    icon: 'school-outline', 
    color: '#2ECC71',
    desc: 'Мектеп, бала бакча'
  },
  { 
    id: '6', 
    title: 'Оюндар', 
    icon: 'controller-classic-outline', 
    color: '#1A1A1A',
    desc: 'Steam, PUBG, WoT'
  },
];

export default function ServicesScreen() {
  
  // Категорияны басканда динамикалык бетке өтүү
  const handleCategoryPress = (category: any) => {
    router.push({
      pathname: `/services/${category.id}`,
      params: { title: category.title }
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Бардык кызматтар</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="search-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Рекламалык баннер (Кешбэк) */}
        <TouchableOpacity 
           style={styles.promoCard}
           onPress={() => router.push('/qr')}
           activeOpacity={0.9}
        >
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>SaNabi QR менен төлөңүз</Text>
            <Text style={styles.promoDesc}>Ар бир төлөмдөн 5% кешбэк алыңыз</Text>
          </View>
          <View style={styles.qrIconBox}>
             <Ionicons name="qr-code" size={30} color="#2ECC71" />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Категориялар</Text>
        
        {/* Категориялар тизмеси */}
        <View style={styles.gridContainer}>
          {SERVICE_CATS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(item)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                <MaterialCommunityIcons name={item.icon as any} size={32} color={item.color} />
              </View>
              <Text style={styles.categoryTitle}>{item.title}</Text>
              <Text style={styles.categoryDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

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
    paddingVertical: 15, 
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  headerIcon: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 15, color: '#1A1A1A', marginTop: 10 },
  
  // Категориялардын сеткасы (Grid)
  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  categoryCard: { 
    width: '48%', 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 24, 
    marginBottom: 15,
    alignItems: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }
  },
  iconBox: { width: 55, height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  categoryTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  categoryDesc: { fontSize: 11, color: '#AAA', fontWeight: '500' },

  // Promo Баннер
  promoCard: { 
    backgroundColor: '#1A1A1A', 
    padding: 22, 
    borderRadius: 28, 
    marginBottom: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#1A1A1A',
    shadowOpacity: 0.3,
    shadowRadius: 15
  },
  promoTextContainer: { flex: 1 },
  promoTitle: { color: '#2ECC71', fontSize: 17, fontWeight: '800' },
  promoDesc: { color: '#FFF', opacity: 0.8, marginTop: 4, fontSize: 12 },
  qrIconBox: { backgroundColor: 'rgba(46, 204, 113, 0.1)', padding: 12, borderRadius: 15 }
});