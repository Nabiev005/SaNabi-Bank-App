import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Баштапкы маалыматтар (эгер эстутум бош болсо колдонулат)
const INITIAL_CARDS = [
  { id: '1', type: 'VISA Gold', number: '**** 1234', balance: '45 000', color: '#1A1A1A' },
  { id: '2', type: 'Элкарт', number: '**** 5678', balance: '12 300', color: '#2ECC71' },
];

export default function CardsScreen() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Жаңы карта үчүн форманын абалы
  const [newCardName, setNewCardName] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');

  // 1. Карталарды жүктөө
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const savedCards = await AsyncStorage.getItem('user_cards');
      if (savedCards !== null) {
        setCards(JSON.parse(savedCards));
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log('Жүктөөдө ката кетти');
    }
  };

  // 2. Картаны сактоо
  const saveCards = async (updatedCards: any) => {
    try {
      await AsyncStorage.setItem('user_cards', JSON.stringify(updatedCards));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log('Сактоодо ката кетти');
    }
  };

  // 3. Жаңы карта кошуу функциясы
  const addNewCard = () => {
    if (!newCardName || !newCardNumber) {
      Alert.alert("Ката", "Сураныч, бардык талааларды толтуруңуз!");
      return;
    }

    const newCard = {
      id: Date.now().toString(),
      type: newCardName,
      number: `**** ${newCardNumber.slice(-4)}`, // Акыркы 4 санын эле көрсөтүү
      balance: '0',
      color: ['#3498db', '#9b59b6', '#e67e22', '#1A1A1A'][Math.floor(Math.random() * 4)], // Рандомдук түс
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    saveCards(updatedCards);
    
    // Форманы тазалоо жана жабуу
    setNewCardName('');
    setNewCardNumber('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Менин карталарым</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={28} color="#2ECC71" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.color }]}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.cardBank}>SaNabi BANK</Text>
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
              <MaterialCommunityIcons 
                name={item.type.toUpperCase().includes('VISA') ? "credit-card" : "credit-card-outline"} 
                size={38} color="white" 
              />
            </View>
          </View>
        )}
      />

      {/* --- ЖАҢЫ КАРТА КОШУУ МОДАЛДЫК ТЕРЕЗЕСИ --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Жаңы карта туташтыруу</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Картанын түрү (мис: VISA, Элкарт)</Text>
            <TextInput
              style={styles.input}
              placeholder="Мисалы: VISA Platinum"
              value={newCardName}
              onChangeText={setNewCardName}
            />

            <Text style={styles.inputLabel}>Картанын номери</Text>
            <TextInput
              style={styles.input}
              placeholder="16 орундуу сан"
              keyboardType="number-pad"
              maxLength={16}
              value={newCardNumber}
              onChangeText={setNewCardNumber}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={addNewCard}>
              <Text style={styles.saveBtnText}>Туташтыруу</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  addBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },
  card: { width: '100%', height: 190, borderRadius: 25, padding: 22, marginBottom: 20, justifyContent: 'space-between', elevation: 8 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardBank: { color: 'white', fontSize: 18, fontWeight: '900' },
  cardType: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  cardNumber: { color: 'white', fontSize: 20, letterSpacing: 3, fontWeight: '500' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  balanceText: { color: 'white', fontSize: 22, fontWeight: 'bold' },

  // Modal Стилдери
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, minHeight: 400 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  inputLabel: { fontSize: 14, color: '#666', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#F5F5F5', padding: 15, borderRadius: 12, fontSize: 16 },
  saveBtn: { backgroundColor: '#2ECC71', padding: 18, borderRadius: 15, marginTop: 30, alignItems: 'center' },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});