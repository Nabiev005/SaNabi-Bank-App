import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, FlatList, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import CurrencyCard from '../components/CurrencyCard';

const { width } = Dimensions.get('window');

const CARDS = [
  { id: '1', type: 'VISA Platinum', balance: 54500.00, number: '4589', color: '#1A1A1A', currency: 'сом' },
  { id: '2', type: 'MasterCard Gold', balance: 1200.50, number: '1122', color: '#1e3799', currency: '$' },
  { id: '3', type: 'Элкарт', balance: 15600.00, number: '9044', color: '#009432', currency: 'сом' },
];

export default function HomeScreen() {
  const [displayBalance, setDisplayBalance] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // Балансты жашыруу үчүн абал
  const targetBalance = 54500.00;

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = targetBalance / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetBalance) {
        setDisplayBalance(targetBalance);
        clearInterval(timer);
      } else {
        setDisplayBalance(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  // Балансты форматтоо функциясы (эгер жашыруун болсо жылдызча көрсөтөт)
  const formatBalance = (amount: number, currency: string) => {
    if (!isBalanceVisible) return `•••••• ${currency}`;
    return `${amount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ${currency}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Саламатсызбы!</Text>
              <Text style={styles.userName}>Айбек 👋</Text>
            </View>
            <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/profile')}>
              <Ionicons name="person-outline" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

          {/* Cards Slider */}
          <FlatList
            data={CARDS}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={width * 0.85 + 15}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={[styles.card, { backgroundColor: item.color, marginLeft: index === 0 ? 0 : 15 }]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardType}>{item.type}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* Көз иконкасы - балансты жашыруу үчүн */}
                    <TouchableOpacity 
                      onPress={() => setIsBalanceVisible(!isBalanceVisible)}
                      style={{ marginRight: 15 }}
                    >
                      <Ionicons 
                        name={isBalanceVisible ? "eye-outline" : "eye-off-outline"} 
                        size={22} 
                        color="white" 
                        style={{ opacity: 0.9 }} 
                      />
                    </TouchableOpacity>
                    <FontAwesome5 name="cc-visa" size={24} color="white" opacity={0.8} />
                  </View>
                </View>

                <View>
                  <Text style={styles.balanceLabel}>Баланс</Text>
                  <Text style={styles.balance}>
                    {index === 0 
                      ? formatBalance(displayBalance, item.currency)
                      : formatBalance(item.balance, item.currency)
                    }
                  </Text>
                </View>
                <Text style={styles.cardNumber}>**** **** **** {item.number}</Text>
              </View>
            )}
          />

          <CurrencyCard />

          <Text style={styles.sectionTitle}>Кызматтар</Text>
          <View style={styles.servicesGrid}>
            <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/transfer')}>
              <View style={[styles.serviceIcon, {backgroundColor: '#E8F5E9'}]}>
                <MaterialCommunityIcons name="send-outline" size={28} color="#2ECC71" />
              </View>
              <Text style={styles.serviceLabel}>Которуу</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/payments')}>
              <View style={[styles.serviceIcon, {backgroundColor: '#E3F2FD'}]}>
                <MaterialCommunityIcons name="receipt-outline" size={28} color="#3498db" />
              </View>
              <Text style={styles.serviceLabel}>Төлөмдөр</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/mobile-topup')}>
              <View style={[styles.serviceIcon, {backgroundColor: '#FFF3E0'}]}>
                <MaterialCommunityIcons name="cellphone-arrow-down" size={28} color="#f39c12" />
              </View>
              <Text style={styles.serviceLabel}>Бирдик</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Акыркы аракеттер</Text>
            <TouchableOpacity onPress={() => router.push('/history')}>
              <Text style={styles.seeAll}>Баарын көрүү</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.transactionCard, { marginBottom: 120 }]}>
              <View style={styles.transactionItem}>
                <View style={styles.transIconBox}>
                  <MaterialCommunityIcons name="cart-outline" size={20} color="#1A1A1A" />
                </View>
                <View style={{flex: 1, marginLeft: 12}}>
                  <Text style={styles.transName}>Globus Market</Text>
                  <Text style={styles.transDate}>Бүгүн, 12:45</Text>
                </View>
                <Text style={styles.transAmountNegative}>
                    {isBalanceVisible ? "-1 200 с." : "••• с."}
                </Text>
              </View>
              
              <View style={[styles.transactionItem, {borderBottomWidth: 0}]}>
                <View style={styles.transIconBox}>
                  <MaterialCommunityIcons name="cash-plus" size={20} color="#2ECC71" />
                </View>
                <View style={{flex: 1, marginLeft: 12}}>
                  <Text style={styles.transName}>Айлык акы</Text>
                  <Text style={styles.transDate}>Кечээ, 18:20</Text>
                </View>
                <Text style={styles.transAmountPositive}>
                    {isBalanceVisible ? "+45 000 с." : "••• с."}
                </Text>
              </View>
          </View>
        </ScrollView>

        {/* --- BOTTOM NAVIGATION --- */}
        <View style={styles.navContainer}>
          <View style={styles.tabBar}>
            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
              <Ionicons name="home" size={22} color="#2ECC71" />
              <Text style={[styles.tabLabel, { color: '#2ECC71' }]}>Башкы</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/history')}>
              <Ionicons name="swap-horizontal" size={22} color="#888" />
              <Text style={styles.tabLabel}>Төлөмдөр</Text>
            </TouchableOpacity>

            <View style={{ width: 70 }} />

            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/chat')}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color="#888" />
              <Text style={styles.tabLabel}>Чат</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/services')}>
              <Ionicons name="grid-outline" size={22} color="#888" />
              <Text style={styles.tabLabel}>Сервистер</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.qrWrapper}>
            <TouchableOpacity 
              style={styles.mbankQrButton}
              onPress={() => router.push('/qr')}
              activeOpacity={0.9}
            >
              <MaterialCommunityIcons name="qrcode-scan" size={26} color="white" />
              <Text style={styles.qrMiniText}>QR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  greeting: { fontSize: 14, color: '#888' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  profileBtn: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4 },
  
  card: { padding: 25, borderRadius: 28, height: 210, width: width * 0.85, justifyContent: 'space-between', elevation: 8, shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardType: { color: '#2ECC71', fontWeight: 'bold', fontSize: 14 },
  balanceLabel: { color: '#FFF', opacity: 0.6, fontSize: 12 },
  balance: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  cardNumber: { color: '#FFF', opacity: 0.8, letterSpacing: 3, fontSize: 14 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  seeAll: { color: '#2ECC71', fontWeight: '600', fontSize: 14 },
  
  servicesGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  serviceItem: { width: '30%', alignItems: 'center' },
  serviceIcon: { width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 1 },
  serviceLabel: { fontSize: 13, color: '#444', fontWeight: '500' },

  transactionCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 15, elevation: 1 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  transIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
  transName: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  transDate: { fontSize: 12, color: '#AAA' },
  transAmountNegative: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A' },
  transAmountPositive: { fontSize: 15, fontWeight: 'bold', color: '#2ECC71' },

  navContainer: { position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' },
  tabBar: { flexDirection: 'row', backgroundColor: '#FFF', width: '100%', height: Platform.OS === 'ios' ? 85 : 65, borderTopLeftRadius: 25, borderTopRightRadius: 25, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, elevation: 30, shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.08, shadowRadius: 15 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: Platform.OS === 'ios' ? 15 : 0 },
  tabLabel: { fontSize: 10, color: '#888', marginTop: 4, fontWeight: '600' },
  qrWrapper: { position: 'absolute', top: -28, zIndex: 10 },
  mbankQrButton: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#2ECC71', justifyContent: 'center', alignItems: 'center', borderWidth: 5, borderColor: '#F8F9FB', elevation: 8, shadowColor: '#2ECC71', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 8 },
  qrMiniText: { color: '#FFF', fontSize: 9, fontWeight: 'bold', marginTop: 2 }
});