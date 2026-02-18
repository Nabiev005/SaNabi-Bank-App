import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Share, Dimensions, StatusBar, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Print from 'expo-print'; // PDF жасоо үчүн
import * as Sharing from 'expo-sharing'; // Бөлүшүү үчүн

const { width } = Dimensions.get('window');

export default function ReceiptScreen() {
  const { amount, receiver, date } = useLocalSearchParams();
  const transactionId = Math.random().toString(36).substring(2, 12).toUpperCase();

  // --- PDF ТҮЗҮҮ ФУНКЦИЯСЫ ---
  const createPDF = async () => {
    // PDFтин ичиндеги HTML структурасы
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #2ECC71; padding-bottom: 20px; }
            .bank-name { font-size: 24px; font-weight: bold; color: #1A1A1A; }
            .status { color: #2ECC71; font-weight: bold; margin-top: 10px; }
            .amount { font-size: 40px; font-weight: bold; margin: 30px 0; }
            .details { width: 100%; margin-top: 20px; border-collapse: collapse; }
            .details td { padding: 10px 0; border-bottom: 1px solid #EEE; }
            .label { color: #888; }
            .value { text-align: right; font-weight: bold; }
            .footer { margin-top: 50px; text-align: center; color: #AAA; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="bank-name">SANABI DIGITAL BANK</div>
            <div class="status">ТӨЛӨМ ИЙГИЛИКТҮҮ ӨТТҮ</div>
          </div>
          <div style="text-align: center;">
            <div class="amount">${amount} KGS</div>
          </div>
          <table class="details">
            <tr><td class="label">Алуучу:</td><td class="value">${receiver}</td></tr>
            <tr><td class="label">Жиберүүчү:</td><td class="value">Айбек Набиев</td></tr>
            <tr><td class="label">Убактысы:</td><td class="value">${date}</td></tr>
            <tr><td class="label">Транзакция №:</td><td class="value">#${transactionId}</td></tr>
            <tr><td class="label">Комиссия:</td><td class="value">0.00 KGS</td></tr>
          </table>
          <div class="footer">
            Бул чек SaNabi Digital Bank тарабынан электрондук түрдө түзүлдү.<br/>
            Коопсуздук QR-коду менен тастыкталган.
          </div>
        </body>
      </html>
    `;

    try {
      // 1. PDF файлын убактылуу сактагычка түзөбүз
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      // 2. Файлды бөлүшүү же сактоо терезесин ачабыз
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      Alert.alert("Ката", "PDF түзүүдө ката кетти");
      console.log(error);
    }
  };

  const onShareText = async () => {
    try {
      await Share.share({
        message: `SaNabi Bank: Которуу ийгиликтүү! Сумма: ${amount} сом. Алуучу: ${receiver}. ID: ${transactionId}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topBackground} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.closeBtn}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Транзакция деталдары</Text>
        <TouchableOpacity onPress={onShareText} style={styles.shareBtn}>
          <Ionicons name="share-social-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.receiptWrapper}>
          <View style={styles.receiptCard}>
            <View style={styles.successBadge}>
              <View style={styles.iconCircle}>
                <Ionicons name="checkmark" size={40} color="#FFF" />
              </View>
            </View>

            <Text style={styles.bankName}>SANABI <Text style={{fontWeight: '300'}}>DIGITAL</Text></Text>
            
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>сом</Text>
              <Text style={styles.amountText}>{amount}</Text>
            </View>
            
            <Text style={styles.statusText}>Ийгиликтүү которулду</Text>
            <View style={styles.dashedLine} />

            <View style={styles.infoTable}>
              <View style={styles.infoRow}><Text style={styles.infoLabel}>Алуучу</Text><Text style={styles.infoValue}>{receiver}</Text></View>
              <View style={styles.infoRow}><Text style={styles.infoLabel}>Жиберүүчү</Text><Text style={styles.infoValue}>Айбек Набиев</Text></View>
              <View style={styles.infoRow}><Text style={styles.infoLabel}>Дата жана убакыт</Text><Text style={styles.infoValue}>{date}</Text></View>
              <View style={styles.infoRow}><Text style={styles.infoLabel}>ID транзакция</Text><Text style={styles.infoValue}>#{transactionId}</Text></View>
            </View>

            <View style={styles.qrContainer}>
              <MaterialCommunityIcons name="qrcode" size={120} color="#1A1A1A" />
            </View>
          </View>

          <View style={styles.zigzagContainer}>
            {[...Array(15)].map((_, i) => (
              <View key={i} style={styles.zigzagPiece} />
            ))}
          </View>
        </View>

        {/* PDF ЖҮКТӨӨ БАСКЫЧЫ ЭМИ ИШТЕЙТ */}
        <TouchableOpacity style={styles.pdfButton} onPress={createPDF}>
          <Ionicons name="document-text-outline" size={20} color="#1A1A1A" />
          <Text style={styles.pdfButtonText}>Чекти PDF түрүндө жүктөө</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  topBackground: { position: 'absolute', top: 0, width: '100%', height: 300, backgroundColor: '#2ECC71' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, zIndex: 1 },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', letterSpacing: 1 },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  shareBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 25, alignItems: 'center', paddingTop: 40 },
  receiptWrapper: { width: '100%', alignItems: 'center' },
  receiptCard: { width: '100%', backgroundColor: '#FFF', borderRadius: 30, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, padding: 30, alignItems: 'center', paddingTop: 50 },
  successBadge: { position: 'absolute', top: -35, width: 70, height: 70, borderRadius: 35, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 10 },
  iconCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#2ECC71', justifyContent: 'center', alignItems: 'center' },
  bankName: { fontSize: 18, fontWeight: '900', letterSpacing: 2, color: '#1A1A1A', marginBottom: 20 },
  amountContainer: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 10 },
  currencySymbol: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginTop: 10, marginRight: 5 },
  amountText: { fontSize: 56, fontWeight: '900', color: '#1A1A1A' },
  statusText: { fontSize: 14, color: '#2ECC71', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  dashedLine: { width: '100%', height: 1, borderWidth: 1, borderColor: '#EEE', borderStyle: 'dashed', marginVertical: 30 },
  infoTable: { width: '100%' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  infoLabel: { fontSize: 13, color: '#AAA', fontWeight: '600' },
  infoValue: { fontSize: 14, color: '#1A1A1A', fontWeight: '700' },
  qrContainer: { alignItems: 'center', marginTop: 20 },
  zigzagContainer: { flexDirection: 'row', width: '100%', height: 15, overflow: 'hidden', marginTop: -1 },
  zigzagPiece: { width: width / 10, height: width / 10, backgroundColor: '#FFF', transform: [{ rotate: '45deg' }], marginTop: -width / 20 },
  pdfButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 20, marginTop: 30, elevation: 5 },
  pdfButtonText: { marginLeft: 10, fontWeight: '700', color: '#1A1A1A' }
});