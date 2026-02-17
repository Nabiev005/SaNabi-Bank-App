import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Share } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ReceiptScreen() {
  const { name, account, amount, date, transactionId } = useLocalSearchParams();

  const onShare = async () => {
    try {
      await Share.share({
        message: `SaNabi Bank: ${name} кызматына төлөм ийгиликтүү өттү. Сумма: ${amount} сом. Транзакция №${transactionId}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="close" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Электрондук чек</Text>
        <TouchableOpacity onPress={onShare}>
          <Ionicons name="share-outline" size={26} color="#2ECC71" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.receiptCard}>
          {/* Ийгиликтүү белгиси */}
          <View style={styles.successIconBox}>
            <Ionicons name="checkmark-circle" size={80} color="#2ECC71" />
            <Text style={styles.successText}>Төлөм ийгиликтүү өттү!</Text>
            <Text style={styles.amountText}>{amount} сом</Text>
          </View>

          <View style={styles.divider} />

          {/* Деталдар */}
          <View style={styles.detailsSection}>
            <DetailRow label="Кызмат" value={name as string} />
            <DetailRow label="Реквизит" value={account as string} />
            <DetailRow label="Төлөөчү" value="Айбек Набиев" />
            <DetailRow label="Убактысы" value={date as string} />
            <DetailRow label="Транзакция №" value={transactionId as string} />
            <DetailRow label="Статус" value="Аткарылды" isStatus />
          </View>

          <View style={styles.divider} />

          {/* QR Code орду (имитация) */}
          <View style={styles.qrSection}>
            <MaterialCommunityIcons name="qrcode-scan" size={100} color="#1A1A1A" />
            <Text style={styles.qrText}>SaNabi Bank тарабынан тастыкталган</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/home')}>
          <Text style={styles.mainButtonText}>Башкы бетке кайтуу</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Кичинекей компонент маалыматтардын сабы үчүн
function DetailRow({ label, value, isStatus }: { label: string, value: string, isStatus?: boolean }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, isStatus && styles.statusValue]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { padding: 20 },
  receiptCard: { backgroundColor: '#FFF', borderRadius: 25, padding: 20, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  successIconBox: { alignItems: 'center', marginBottom: 20 },
  successText: { fontSize: 16, color: '#888', marginTop: 10 },
  amountText: { fontSize: 32, fontWeight: '800', color: '#1A1A1A', marginTop: 5 },
  divider: { width: '100%', height: 1, backgroundColor: '#F0F0F0', marginVertical: 20, borderStyle: 'dashed', borderRadius: 1 },
  detailsSection: { width: '100%' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  detailLabel: { color: '#888', fontSize: 14 },
  detailValue: { fontWeight: '600', color: '#1A1A1A', fontSize: 14 },
  statusValue: { color: '#2ECC71' },
  qrSection: { alignItems: 'center', marginTop: 10 },
  qrText: { fontSize: 12, color: '#AAA', marginTop: 10 },
  mainButton: { backgroundColor: '#1A1A1A', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 25 },
  mainButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});