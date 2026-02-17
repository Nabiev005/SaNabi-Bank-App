import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Кызматтардын толук базасы. 
 * Бул маалыматтар Payments барагынан келген 'id' боюнча фильтрленет.
 */
const SUB_SERVICES: any = {
  '1': [ // Мобилдик байланыш
    { id: 'm1', name: 'Beeline KG', icon: 'cellphone', color: '#FFC107' },
    { id: 'm2', name: 'Mega', icon: 'cellphone', color: '#4CAF50' },
    { id: 'm3', name: 'O!', icon: 'cellphone', color: '#9C27B0' },
  ],
  '2': [ // Коммуналдык төлөмдөр
    { id: 'u1', name: 'Северэлектро', icon: 'lightning-bolt', color: '#F1C40F' },
    { id: 'u2', name: 'Бишкекжылуулук', icon: 'fire', color: '#E74C3C' },
    { id: 'u3', name: 'Тазалык (Мусор)', icon: 'trash-can', color: '#3498DB' },
    { id: 'u4', name: 'Бишкекводоканал', icon: 'water', color: '#2980B9' },
  ],
  '3': [ // Интернет жана ТВ
    { id: 'i1', name: 'Aknet', icon: 'router-wireless', color: '#E67E22' },
    { id: 'i2', name: 'Saima Telecom', icon: 'wifi', color: '#16A085' },
    { id: 'i3', name: 'Megaline', icon: 'web', color: '#34495E' },
    { id: 'i4', name: 'Homeline', icon: 'home-network', color: '#8E44AD' },
  ],
  '4': [ // Мамлекеттик төлөмдөр
    { id: 'g1', name: 'Коопсуз шаар (Штрафтар)', icon: 'gavel', color: '#C0392B' },
    { id: 'g2', name: 'Салык кызматы', icon: 'bank', color: '#7F8C8D' },
    { id: 'g3', name: 'Мүлктүк салык', icon: 'home-city', color: '#2C3E50' },
  ],
  '5': [ // Билим берүү
    { id: 'ed1', name: 'Мектеп (Тамак-аш)', icon: 'silverware-fork-knife', color: '#2ECC71' },
    { id: 'ed2', name: 'ЖОК (ВУЗ)', icon: 'school', color: '#2ECC71' },
    { id: 'ed3', name: 'Бала бакча', icon: 'baby-carriage', color: '#2ECC71' },
  ],
  '6': [ // Оюндар
    { id: 'ga1', name: 'Steam', icon: 'steam', color: '#171A21' },
    { id: 'ga2', name: 'PUBG Mobile', icon: 'controller-classic', color: '#F39C12' },
    { id: 'ga3', name: 'World of Tanks', icon: 'tank', color: '#607D8B' },
  ]
};

export default function CategoryDetailScreen() {
  const { id, title } = useLocalSearchParams();
  
  // Эгер id жок болсо, бош тизме көрсөтөбүз
  const services = SUB_SERVICES[id as string] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header бөлүгү */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          activeOpacity={0.6}
        >
          <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title || "Кызматтар"}
        </Text>
        
        <View style={{ width: 40 }} /> 
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => router.push({
              pathname: "/pay",
              params: { 
                name: item.name, 
                color: item.color,
                icon: item.icon
              }
            } as any)}
          >
            {/* Иконка (Түсү 15% тунуктук менен берилген) */}
            <View style={[styles.iconCircle, { backgroundColor: item.color + '25' }]}>
              <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
            </View>

            <View style={styles.textInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSubText}>Комиссия 0%</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#CCC" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Бул категорияда кызматтар табылган жок</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FB' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  backButton: {
    padding: 5,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    flex: 1
  },
  listContent: { 
    padding: 20,
    paddingBottom: 40 
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 22, 
    marginBottom: 14, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }
  },
  iconCircle: { 
    width: 52, 
    height: 52, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  textInfo: {
    flex: 1,
  },
  itemName: { 
    fontSize: 16, 
    fontWeight: '700',
    color: '#1A1A1A'
  },
  itemSubText: {
    fontSize: 12,
    color: '#2ECC71', // Жашыл түс комиссия жок экенин баса белгилейт
    marginTop: 3,
    fontWeight: '500'
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center'
  },
  emptyText: {
    color: '#888',
    fontSize: 14
  }
});