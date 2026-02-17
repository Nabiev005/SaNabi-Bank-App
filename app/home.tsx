// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, FlatList, Dimensions, Platform } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyCard from '../components/CurrencyCard';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [cards, setCards] = useState<any[]>([]);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [displayBalance, setDisplayBalance] = useState(0);

  // Карталарды жүктөө
  const loadCards = async () => {
    try {
      const savedCards = await AsyncStorage.getItem('user_cards');
      if (savedCards !== null) {
        const parsedCards = JSON.parse(savedCards);
        setCards(parsedCards);
        if (parsedCards.length > 0) {
          animateBalance(parseFloat(parsedCards[0].balance.replace(/\s/g, '')) || 0);
        }
      } else {
        const defaultCards = [
          { id: '1', type: 'VISA Platinum', balance: '54 500', number: '4589', color: '#1A1A1A', currency: 'сом' },
          { id: '2', type: 'Элкарт', balance: '12 300', number: '9044', color: '#009432', currency: 'сом' },
        ];
        setCards(defaultCards);
        animateBalance(54500);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log('Error loading cards');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const animateBalance = (target: number) => {
    let start = 0;
    const duration = 1000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayBalance(target);
        clearInterval(timer);
      } else {
        setDisplayBalance(start);
      }
    }, 16);
  };

  const formatBalance = (amount: any, currency: string = 'сом') => {
    if (!isBalanceVisible) return `•••••• ${currency}`;
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/\s/g, '')) : amount;
    return `${num.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ${currency}`;
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

          {/* Карталар */}
          <FlatList
            data={cards}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.88 + 15}
            decelerationRate="fast"
            contentContainerStyle={{ paddingRight: 20 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => router.push('/cards')}
                style={[styles.card, { backgroundColor: item.color, marginLeft: index === 0 ? 0 : 15 }]}
              >
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardBank}>SaNabi BANK</Text>
                    <Text style={styles.cardType}>{item.type}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setIsBalanceVisible(!isBalanceVisible)}>
                    <Ionicons 
                      name={isBalanceVisible ? "eye-outline" : "eye-off-outline"} 
                      size={24} color="white" style={{ opacity: 0.8 }} 
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.balanceContainer}>
                  <Text style={styles.balanceLabel}>Баланс</Text>
                  <Text style={styles.balance}>
                    {index === 0 ? formatBalance(displayBalance) : formatBalance(item.balance)}
                  </Text>
                </View>

                <View style={styles.cardBottom}>
                  <Text style={styles.cardNumber}>**** **** **** {item.number.slice(-4)}</Text>
                  <FontAwesome5 
                    name={item.type.toUpperCase().includes('VISA') ? "cc-visa" : "credit-card"} 
                    size={24} color="white" opacity={0.7} 
                  />
                </View>
              </TouchableOpacity>
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

            {/* БУЛ ЖЕРДЕ КАТА ОҢДОЛДУ: MaterialCommunityIcons ордуна Ionicons колдонулду */}
            <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/services')}>
              <View style={[styles.serviceIcon, {backgroundColor: '#FFF3E0'}]}>
                <Ionicons name="grid-outline" size={28} color="#f39c12" />
              </View>
              <Text style={styles.serviceLabel}>Сервистер</Text>
            </TouchableOpacity>
          </View>

          {/* Акыркы аракеттер */}
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

        {/* Bottom Navigation */}
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
            <TouchableOpacity style={styles.mbankQrButton} onPress={() => router.push('/qr')}>
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
  greeting: { fontSize: 13, color: '#888', fontWeight: '500' },
  userName: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  card: { padding: 22, borderRadius: 28, height: 200, width: width * 0.88, justifyContent: 'space-between', elevation: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardBank: { color: '#FFF', fontSize: 16, fontWeight: '900' },
  cardType: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  balanceContainer: { marginTop: 10 },
  balanceLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  balance: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardNumber: { color: '#FFF', opacity: 0.9, letterSpacing: 2, fontSize: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  seeAll: { color: '#2ECC71', fontWeight: '700', fontSize: 14 },
  servicesGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  serviceItem: { width: '30%', alignItems: 'center' },
  serviceIcon: { width: 62, height: 62, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 2 },
  serviceLabel: { fontSize: 13, color: '#444', fontWeight: '600' },
  transactionCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 16, elevation: 2 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  transIconBox: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#F8F9FB', justifyContent: 'center', alignItems: 'center' },
  transName: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  transDate: { fontSize: 12, color: '#AAA' },
  transAmountNegative: { fontSize: 15, fontWeight: '800', color: '#1A1A1A' },
  transAmountPositive: { fontSize: 15, fontWeight: '800', color: '#2ECC71' },
  navContainer: { position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' },
  tabBar: { flexDirection: 'row', backgroundColor: '#FFF', width: '100%', height: Platform.OS === 'ios' ? 90 : 70, borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, elevation: 25 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: Platform.OS === 'ios' ? 20 : 0 },
  tabLabel: { fontSize: 10, color: '#888', marginTop: 5, fontWeight: '700' },
  qrWrapper: { position: 'absolute', top: -30, zIndex: 10 },
  mbankQrButton: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#2ECC71', justifyContent: 'center', alignItems: 'center', borderWidth: 6, borderColor: '#F8F9FB', elevation: 10 },
  qrMiniText: { color: '#FFF', fontSize: 10, fontWeight: '900', marginTop: 2 }
});