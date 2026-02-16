import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const OPERATORS = [
  { id: 'o', name: 'O!', color: '#EB008B' },
  { id: 'mega', name: 'Mega', color: '#00B050' },
  { id: 'beeline', name: 'Beeline', color: '#FFC600' }
];

const QUICK_AMOUNTS = ['50', '100', '200', '500', '1000'];

export default function MobileTopup() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedOp, setSelectedOp] = useState('o');

  // Номерди форматтоо (мисалы: 700 123 456)
  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setPhone(cleaned);
    
    // Номерге карап операторду автоматтык түрдө болжолдоо (мисалы)
    if (cleaned.startsWith('70') || cleaned.startsWith('50')) setSelectedOp('o');
    if (cleaned.startsWith('55') || cleaned.startsWith('99') || cleaned.startsWith('75')) setSelectedOp('mega');
    if (cleaned.startsWith('77') || cleaned.startsWith('22')) setSelectedOp('beeline');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Бирдик толтуруу</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          {/* Операторлор */}
          <View style={styles.operatorRow}>
            {OPERATORS.map((op) => (
              <TouchableOpacity 
                key={op.id} 
                style={[
                  styles.opCircle, 
                  selectedOp === op.id && { borderColor: op.color, borderWidth: 2 }
                ]}
                onPress={() => setSelectedOp(op.id)}
              >
                <View style={[styles.innerCircle, { backgroundColor: op.color }]}>
                  <Text style={styles.opText}>{op.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Телефон номери */}
          <View style={styles.inputGroup}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.inputLabel}>Телефон номери</Text>
              <TouchableOpacity>
                <Ionicons name="person-add-outline" size={20} color="#2ECC71" />
              </TouchableOpacity>
            </View>
            <View style={styles.phoneInputRow}>
              <Text style={styles.prefix}>+996</Text>
              <TextInput
                style={styles.mainInput}
                placeholder="700 123 456"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={handlePhoneChange}
                maxLength={9}
              />
            </View>
          </View>

          {/* Сумма */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Сумма</Text>
            <View style={styles.amountInputRow}>
              <TextInput
                style={[styles.mainInput, { fontSize: 32, fontWeight: 'bold' }]}
                placeholder="0"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
              <Text style={styles.currency}>сом</Text>
            </View>
            
            {/* Тез тандоо суммалары */}
            <View style={styles.quickAmountRow}>
              {QUICK_AMOUNTS.map((val) => (
                <TouchableOpacity 
                  key={val} 
                  style={styles.amountChip}
                  onPress={() => setAmount(val)}
                >
                  <Text style={styles.amountChipText}>{val}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Маалымат */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#888" />
            <Text style={styles.infoText}>Комиссия 0%</Text>
          </View>

          {/* Төлөө баскычы */}
          <TouchableOpacity 
            style={[
              styles.confirmBtn, 
              { backgroundColor: (phone.length >= 9 && amount) ? '#2ECC71' : '#E0E0E0' }
            ]} 
            activeOpacity={0.8}
            disabled={!(phone.length >= 9 && amount)}
          >
            <Text style={styles.confirmBtnText}>Төлөө</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingVertical: 10,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  content: { padding: 20 },
  operatorRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginBottom: 30 
  },
  opCircle: { width: 70, height: 70, borderRadius: 35, padding: 3, justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: '100%', height: '100%', borderRadius: 35, justifyContent: 'center', alignItems: 'center' },
  opText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  inputGroup: { 
    backgroundColor: '#FFF', 
    padding: 18, 
    borderRadius: 24, 
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  inputLabel: { fontSize: 12, color: '#AAA', marginBottom: 8, fontWeight: '600' },
  phoneInputRow: { flexDirection: 'row', alignItems: 'center' },
  amountInputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  prefix: { fontSize: 22, fontWeight: '600', marginRight: 10, color: '#1A1A1A' },
  mainInput: { fontSize: 22, fontWeight: '600', flex: 1, color: '#1A1A1A' },
  currency: { fontSize: 18, color: '#888', fontWeight: '500' },
  quickAmountRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  amountChip: { 
    backgroundColor: '#F5F5F5', 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 12 
  },
  amountChipText: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  infoBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  infoText: { marginLeft: 5, color: '#888', fontSize: 14 },
  confirmBtn: { 
    padding: 18, 
    borderRadius: 22, 
    alignItems: 'center', 
    marginTop: 30,
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  confirmBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});