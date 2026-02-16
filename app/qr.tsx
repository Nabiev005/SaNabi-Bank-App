import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function QRScannerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Камеранын орду (имитация) */}
      <View style={styles.cameraOverlay}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.scannerFrame}>
          {/* Бул жерде QR код үчүн рамка */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          
          <Text style={styles.scanText}>QR-кодду рамкага тууралаңыз</Text>
        </View>

        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.flashlightBtn}>
            <Text style={{fontSize: 24}}>🔦</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  closeBtn: { position: 'absolute', top: 50, left: 20, width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  closeText: { color: '#fff', fontSize: 20 },
  scannerFrame: { width: 250, height: 250, justifyContent: 'center', alignItems: 'center' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: '#2ecc71', borderWidth: 4 },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  scanText: { color: '#fff', marginTop: 300, fontSize: 16, fontWeight: '500' },
  bottomControls: { position: 'absolute', bottom: 60, width: '100%', alignItems: 'center' },
  flashlightBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' }
});