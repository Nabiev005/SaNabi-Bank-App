import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, SafeAreaView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('input'); // 'input', 'loading', 'welcome'
  
  // Анимация өзгөрмөлөрү
  const fadeAnim = useRef(new Animated.Value(1)).current; 
  const welcomeFade = useRef(new Animated.Value(0)).current;
  const welcomeSlide = useRef(new Animated.Value(20)).current;

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);

      if (newPin === '5555') {
        processLogin();
      } else if (newPin.length === 4) {
        setPin(''); // Ката болсо тазалоо
      }
    }
  };

  const processLogin = () => {
    // 1-кадам: Баскычтарды акырын өчүрүү жана Loading баштоо
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStatus('loading');
      
      // 2-кадам: 1.5 секунд "жүктөө" симуляциясы
      setTimeout(() => {
        setStatus('welcome');
        startWelcomeAnimation();
      }, 1500);
    });
  };

  const startWelcomeAnimation = () => {
    // 3-кадам: Саламдашууну анимация менен чыгаруу
    Animated.parallel([
      Animated.timing(welcomeFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(welcomeSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(() => {
      // 4-кадам: Башкы бетке өтүү
      setTimeout(() => {
        router.replace('/home');
      }, 1500);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. ПИН-КОД КИРГИЗҮҮ ЭКРАНЫ */}
      {status === 'input' && (
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.bankName}>SANABI BANK</Text>
          <View style={styles.dotsRow}>
            {[1, 2, 3, 4].map(i => (
              <View key={i} style={[styles.dot, pin.length >= i && styles.dotActive]} />
            ))}
          </View>
          <View style={styles.keypad}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((key, i) => (
              <TouchableOpacity 
                key={i} 
                style={styles.key} 
                onPress={() => key === '⌫' ? setPin(pin.slice(0, -1)) : handlePress(key)}
                disabled={key === ''}
              >
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}

      {/* 2. ЖҮКТӨЛҮҮ (LOADING) АНИМАЦИЯСЫ */}
      {status === 'loading' && (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#2ecc71" />
          <Text style={styles.loadingText}>Коопсуз кирүү текшерилүүдө...</Text>
        </View>
      )}

      {/* 3. САЛАМДАШУУ ЭКРАНЫ */}
      {status === 'welcome' && (
        <Animated.View style={[
          styles.centerBox, 
          { opacity: welcomeFade, transform: [{ translateY: welcomeSlide }] }
        ]}>
          <View style={styles.avatarCircle}>
            <Text style={{fontSize: 42}}>👤</Text>
          </View>
          <Text style={styles.welcomeTitle}>Кош келиңиз,</Text>
          <Text style={styles.userName}>Набиев Айбек</Text>
        </Animated.View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  content: { alignItems: 'center' },
  bankName: { color: '#2ecc71', fontSize: 30, fontWeight: 'bold', marginBottom: 50, letterSpacing: 2 },
  dotsRow: { flexDirection: 'row', marginBottom: 60 },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: '#333', marginHorizontal: 12 },
  dotActive: { backgroundColor: '#2ecc71', borderColor: '#2ecc71' },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', width: 320, justifyContent: 'center' },
  key: { width: 80, height: 80, margin: 10, borderRadius: 40, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  keyText: { color: '#fff', fontSize: 26 },
  
  centerBox: { alignItems: 'center' },
  loadingText: { color: '#666', marginTop: 20, fontSize: 14 },
  
  avatarCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#2ecc71' },
  welcomeTitle: { color: '#888', fontSize: 18 },
  userName: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginTop: 8 }
});