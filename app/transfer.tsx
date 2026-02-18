import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, StatusBar, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // npx expo install expo-linear-gradient

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { width } = Dimensions.get('window');

const CONTACTS = [
  { id: '1', name: 'Апам', phone: '0700112233', color: '#FF6B6B' },
  { id: '2', name: 'Иниси', phone: '0555443322', color: '#4D96FF' },
  { id: '3', name: 'Азамат', phone: '0777998877', color: '#6BCB77' },
  { id: '4', name: 'Нурбек', phone: '0999112233', color: '#FFD93D' },
  { id: '5', name: 'Эжекем', phone: '0707123456', color: '#9B59B6' },
];

const QUICK_AMOUNTS = ['100', '200', '500', '1000', '5000'];

export default function TransferScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    if (phoneNumber && amount) {
      router.push({
        pathname: '/receipt',
        params: { 
          amount: amount, 
          receiver: phoneNumber, 
          date: new Date().toLocaleString('ru-RU') 
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Акча которуу</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="scan-outline" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* Карта тандоо (Минимализм стилинде) */}
          <View style={styles.cardSelector}>
            <LinearGradient colors={['#1A1A1A', '#333']} style={styles.miniCard}>
              <MaterialCommunityIcons name="integrated-circuit-chip" size={24} color="#D4AF37" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.cardName}>SaNabi Black Gold</Text>
                <Text style={styles.cardBalance}>45 600.50 сом</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#AAA" style={{ marginLeft: 'auto' }} />
            </LinearGradient>
          </View>

          {/* Алуучуну тандоо */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Тез которуу</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Баары</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contactsScroll}>
            <TouchableOpacity style={styles.addContact}>
              <View style={styles.addIcon}><Ionicons name="add" size={30} color="#2ECC71" /></View>
              <Text style={styles.contactNameText}>Жаңы</Text>
            </TouchableOpacity>

            {CONTACTS.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.contactCard}
                onPress={() => setPhoneNumber(item.phone)}
              >
                <View style={[styles.avatar, { backgroundColor: item.color }]}>
                  <Text style={styles.avatarLetter}>{item.name[0]}</Text>
                </View>
                <Text numberOfLines={1} style={styles.contactNameText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Киргизүү блогу */}
          <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Алуучунун номери же картасы</Text>
              <View style={styles.rowInput}>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="0XXX XX XX XX"
                  placeholderTextColor="#CCC"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
                <TouchableOpacity><Ionicons name="person-add-outline" size={22} color="#2ECC71" /></TouchableOpacity>
              </View>
            </View>

            <View style={[styles.inputWrapper, { marginTop: 25 }]}>
              <Text style={styles.inputLabel}>Сумманы киргизиңиз</Text>
              <View style={styles.amountRow}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  placeholderTextColor="#E0E0E0"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  autoFocus={false}
                />
                <Text style={styles.currencySuffix}>СОМ</Text>
              </View>
            </View>

            {/* Тез сумма баскычтары */}
            <View style={styles.quickAmountContainer}>
              {QUICK_AMOUNTS.map((val) => (
                <TouchableOpacity 
                  key={val} 
                  style={styles.quickAmountBtn}
                  onPress={() => setAmount(val)}
                >
                  <Text style={styles.quickAmountText}>+{val}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Кошумча маалымат */}
          <View style={styles.feeBadge}>
            <MaterialCommunityIcons name="shield-check" size={18} color="#2ECC71" />
            <Text style={styles.feeText}>Комиссия 0% • Заматта которулат</Text>
          </View>

        </ScrollView>

        {/* Которуу баскычы (Төмөндө бекитилген) */}
        <View style={styles.footerBtnContainer}>
          <TouchableOpacity 
            style={[styles.mainButton, (!phoneNumber || !amount) && styles.disabledBtn]}
            onPress={handleTransfer}
            disabled={!phoneNumber || !amount}
          >
            <LinearGradient 
              colors={(!phoneNumber || !amount) ? ['#A5D6A7', '#A5D6A7'] : ['#2ECC71', '#27AE60']} 
              style={styles.gradientBtn}
            >
              <Text style={styles.mainButtonText}>Которууну ырастоо</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" style={{ marginLeft: 10 }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 60 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
  headerIcon: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },

  cardSelector: { paddingHorizontal: 20, marginTop: 10 },
  miniCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 20 },
  cardName: { color: '#AAA', fontSize: 12, fontWeight: '600' },
  cardBalance: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 25, alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  seeAll: { color: '#2ECC71', fontWeight: '700', fontSize: 13 },

  contactsScroll: { paddingLeft: 20, paddingVertical: 15 },
  addContact: { alignItems: 'center', marginRight: 20 },
  addIcon: { width: 56, height: 56, borderRadius: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: '#2ECC71', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  contactCard: { alignItems: 'center', marginRight: 18, width: 65 },
  avatar: { width: 56, height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  avatarLetter: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  contactNameText: { fontSize: 12, fontWeight: '600', color: '#666' },

  inputSection: { paddingHorizontal: 20, marginTop: 10 },
  inputWrapper: { backgroundColor: '#F8F9FB', padding: 18, borderRadius: 25 },
  inputLabel: { fontSize: 11, color: '#AAA', fontWeight: '700', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 0.5 },
  rowInput: { flexDirection: 'row', alignItems: 'center' },
  phoneInput: { flex: 1, fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  
  amountRow: { flexDirection: 'row', alignItems: 'baseline' },
  amountInput: { fontSize: 40, fontWeight: '900', color: '#1A1A1A', flex: 1 },
  currencySuffix: { fontSize: 18, fontWeight: '800', color: '#2ECC71', marginLeft: 10 },

  quickAmountContainer: { flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' },
  quickAmountBtn: { backgroundColor: '#F0F9F4', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12 },
  quickAmountText: { color: '#2ECC71', fontWeight: '700', fontSize: 13 },

  feeBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25, backgroundColor: '#F0FDF4', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15 },
  feeText: { fontSize: 12, color: '#27AE60', fontWeight: '600', marginLeft: 8 },

  footerBtnContainer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#FFF' },
  mainButton: { width: '100%', height: 60, borderRadius: 20, overflow: 'hidden' },
  gradientBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  mainButtonText: { color: '#FFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
  disabledBtn: { opacity: 0.8 }
});