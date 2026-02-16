import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';

export default function TransferScreen() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    if (!phone || !amount) {
      Alert.alert("Ката", "Сураныч, номерди жана сумманы киргизиңиз!");
      return;
    }

    // Бул жерде чыныгы банкта базага суроо кетет
    Alert.alert(
      "Которуу аткарылды",
      `${phone} номерине ${amount} сом ийгиликтүү жөнөтүлдү.`,
      [{ text: "OK", onPress: () => router.back() }] // Артка кайтарат
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Артка</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Акча которуу</Text>
          <Text style={styles.description}>
            Телефон номери аркылуу каалаган адамга заматта акча жөнөтүңүз.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Алуучунун номери</Text>
            <TextInput
              style={styles.input}
              placeholder="0XXX XX XX XX"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>Сумма (сом)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Text style={styles.sendBtnText}>Жөнөтүү</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  content: { flex: 1, padding: 25 },
  backBtn: { marginBottom: 20 },
  backText: { color: '#2ecc71', fontSize: 18, fontWeight: '600' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a' },
  description: { fontSize: 14, color: '#888', marginBottom: 30, lineHeight: 20 },
  inputGroup: { marginBottom: 30 },
  label: { fontSize: 14, color: '#333', marginBottom: 8, fontWeight: '500' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 15,
    padding: 18,
    fontSize: 18,
    marginBottom: 20,
  },
  sendBtn: {
    backgroundColor: '#2ecc71',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sendBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});