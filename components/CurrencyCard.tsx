import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// Бизге керектүү валюталардын түрлөрү
interface Rates {
  USD: number;
  EUR: number;
  RUB: number;
}

export default function CurrencyCard() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Бул жерде биз реалдуу API'ден маалымат алабыз
    // Азырынча симуляция кылабыз, бирок структурасы бирдей
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        // Сомго карата курсту эсептейбиз (болжолдуу)
        setRates({
          USD: 89.50,
          EUR: 97.20,
          RUB: 0.98
        });
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (loading) return <ActivityIndicator size="small" color="#2ecc71" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Валюта курсу (NBKR)</Text>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.label}>USD</Text>
          <Text style={styles.value}>{rates?.USD}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>EUR</Text>
          <Text style={styles.value}>{rates?.EUR}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>RUB</Text>
          <Text style={styles.value}>{rates?.RUB}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 20, borderRadius: 20, marginTop: 20, elevation: 2 },
  title: { fontSize: 14, color: '#888', marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  item: { alignItems: 'center' },
  label: { fontWeight: 'bold', color: '#333' },
  value: { color: '#2ecc71', marginTop: 5, fontWeight: '600' }
});