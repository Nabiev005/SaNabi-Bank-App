import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, Modal, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard'; // Көчүрүү үчүн
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);
  const [qrData, setQrData] = useState<string>('');

  // Камерага уруксатты текшерүү
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!permission) {
    return <View style={styles.container} />; // Жүктөө учуру
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Камерага уруксат берилген жок</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
          <Text style={styles.permissionBtnText}>Уруксат берүү</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // QR код окулганда
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setQrData(data);
    setScanned(true);
  };

  // Текстти көчүрүү функциясы
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(qrData);
    Alert.alert("Ийгиликтүү", "Текст көчүрүлдү!");
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={torch}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        <SafeAreaView style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <Ionicons name="close" size={26} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>QR Сканер</Text>
            <TouchableOpacity onPress={() => setTorch(!torch)} style={styles.iconBtn}>
              <Ionicons name={torch ? "flashlight" : "flashlight-outline"} size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Scanner Frame */}
          <View style={styles.mainScanner}>
            <View style={styles.scannerFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
              <View style={styles.scanLine} />
            </View>
            <Text style={styles.hintText}>Рамканын ичине тууралаңыз</Text>
          </View>
        </SafeAreaView>
      </CameraView>

      {/* Жыйынтык чыгуучу терезе (Modal) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={scanned}
        onRequestClose={() => setScanned(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIndicator} />
            <Text style={styles.resultTitle}>QR код маалыматы</Text>
            
            <View style={styles.dataBox}>
              <Text style={styles.qrResultText}>{qrData}</Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.copyBtn} onPress={copyToClipboard}>
                <Ionicons name="copy-outline" size={20} color="#1A1A1A" />
                <Text style={styles.copyBtnText}>Көчүрүү</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.closeModalBtn} 
                onPress={() => setScanned(false)}
              >
                <Text style={styles.closeModalBtnText}>Кайра сканерлөө</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  errorText: { color: '#fff', textAlign: 'center', marginBottom: 20 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 10 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 45, height: 45, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' },

  mainScanner: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scannerFrame: { width: width * 0.7, height: width * 0.7, position: 'relative' },
  
  corner: { position: 'absolute', width: 30, height: 30, borderColor: '#2ecc71', borderWidth: 5 },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 20 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 20 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 20 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 20 },
  
  scanLine: { width: '100%', height: 2, backgroundColor: '#2ecc71', position: 'absolute', top: '50%', opacity: 0.6 },
  hintText: { color: '#fff', fontSize: 14, marginTop: 30, fontWeight: '500' },

  permissionBtn: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 12, alignSelf: 'center' },
  permissionBtnText: { color: '#fff', fontWeight: '700' },

  // Modal Styles
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, alignItems: 'center' },
  modalIndicator: { width: 40, height: 5, backgroundColor: '#eee', borderRadius: 10, marginBottom: 20 },
  resultTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15, color: '#1A1A1A' },
  dataBox: { backgroundColor: '#F8F9FB', padding: 20, borderRadius: 20, width: '100%', marginBottom: 25, borderWidth: 1, borderColor: '#eee' },
  qrResultText: { fontSize: 16, color: '#444', textAlign: 'center', fontWeight: '600' },
  buttonGroup: { flexDirection: 'row', width: '100%' },
  copyBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0', height: 60, borderRadius: 20, marginRight: 10 },
  copyBtnText: { marginLeft: 10, fontWeight: '700', color: '#1A1A1A' },
  closeModalBtn: { flex: 1.5, backgroundColor: '#2ecc71', height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  closeModalBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 }
});