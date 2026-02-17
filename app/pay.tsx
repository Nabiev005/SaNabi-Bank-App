import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PayScreen() {
  const { name, color } = useLocalSearchParams(); 
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');

  const handlePay = () => {
    if (!account || !amount) {
      Alert.alert("Ката", "Сураныч, бардык талааларды толтуруңуз");
      return;
    }

    // Төлөмдү имитациялоо жана чек бетине маалыматтарды жиберүү
    router.push({
      pathname: "/receipt",
      params: { 
        name: name, 
        account: account, 
        amount: amount,
        // Уникалдуу транзакция номери жана убактысы
        date: new Date().toLocaleString('ru-RU'),
        transactionId: Math.floor(Math.random() * 1000000000).toString()
      }
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{name}</Text>
          <View style={{ width: 26 }} />
        </View>

        <View style={styles.content}>
          {/* Кызматтын логотиби (Биринчи тамгасы) */}
          <View style={[styles.serviceIcon, { backgroundColor: (color as string) || '#2ECC71' }]}>
            <Text style={styles.iconText}>{(name as string)?.charAt(0)}</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Эсептик эсеп же телефон номер</Text>
            <TextInput
              style={styles.input}
              placeholder="000 000 000"
              keyboardType="numeric"
              value={account}
              onChangeText={setAccount}
            />

            <Text style={styles.label}>Сумма (сом)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.payButtonText}>Төлөө</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { padding: 30, alignItems: 'center', flex: 1 },
  serviceIcon: { width: 80, height: 80, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 40, elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
  iconText: { color: '#FFF', fontSize: 40, fontWeight: 'bold' },
  form: { width: '100%' },
  label: { alignSelf: 'flex-start', color: '#888', marginBottom: 10, fontSize: 14, fontWeight: '500' },
  input: { width: '100%', backgroundColor: '#F8F9FB', padding: 18, borderRadius: 15, fontSize: 18, marginBottom: 25, borderWidth: 1, borderColor: '#F0F0F0' },
  payButton: { width: '100%', backgroundColor: '#1A1A1A', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 'auto', marginBottom: 20 },
  payButtonText: { color: '#FFF', fontSize: 18, fontWeight: '700' }
});