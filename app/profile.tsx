import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert, Share, Image, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

export default function ProfileScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isTermsVisible, setIsTermsVisible] = useState(false); // Келишимдер үчүн модал

  useEffect(() => {
    loadSavedImage();
  }, []);

  const loadSavedImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('user_profile_image');
      if (savedImage !== null) setImage(savedImage);
    } catch (e) {
      console.log("Сүрөттү жүктөөдө ката:", e);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ката', 'Галереяга уруксат беришиңиз керек!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImage(selectedUri);
      try {
        await AsyncStorage.setItem('user_profile_image', selectedUri);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        Alert.alert('Ката', 'Сүрөттү сактоодо мүчүлүштүк болду');
      }
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: 'SaNabi Bank - Санарип келечек! Тиркемени жүктөп алыңыз: https://sanabi.kg',
      });
    } catch (error) {
      console.log(error);
    }
  };

  // --- РЕАЛДУУ ЧЫГУУ ЛОГИКАСЫ ---
  const handleLogout = () => {
    Alert.alert(
      "Системадан чыгуу",
      "Сиз чын эле чыгууну каалайсызбы? Бардык убактылуу маалыматтар тазаланат.",
      [
        { text: "Жок", style: "cancel" },
        { 
          text: "Ооба, чыгуу", 
          style: "destructive",
          onPress: async () => {
            try {
              // Кааласаң профиль сүрөтүн калтырып, калган сессияны тазаласаң болот
              // await AsyncStorage.clear(); // Бардыгын өчүрүү
              await AsyncStorage.removeItem('user_session_token'); // Сессияны гана өчүрүү
              router.replace('/'); // Кирүү барагына жиберүү
            } catch (e) {
              console.log("Чыгууда ката:", e);
            }
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Ionicons name="close" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Профиль</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>А</Text>
            )}
            <TouchableOpacity style={styles.editAvatar} onPress={pickImage}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Айбек Набиев</Text>
          <Text style={styles.userPhone}>+996 702 *** 200</Text>
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#2ECC71" />
            <Text style={styles.statusText}> Идентификацияланган</Text>
          </View>
        </View>

        {/* Sections */}
        <View style={styles.menuSection}>
          <Text style={styles.menuLabel}>Коопсуздук</Text>
          <MenuOption icon="card-outline" title="Менин карталарым" count="3" onPress={() => router.push('/cards')} />
          <View style={styles.menuItem}>
            <Ionicons name="finger-print-outline" size={22} color="#1A1A1A" />
            <Text style={styles.menuText}>FaceID / TouchID</Text>
            <Switch value={faceIdEnabled} onValueChange={setFaceIdEnabled} trackColor={{ false: "#D1D1D1", true: "#2ECC71" }} />
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuLabel}>Маалымат</Text>
          <MenuOption icon="share-social-outline" title="Досторго сунуштоо" onPress={onShare} />
          <MenuOption 
            icon="document-text-outline" 
            title="Келишимдер жана шарттар" 
            onPress={() => setIsTermsVisible(true)} 
          />
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#E74C3C" />
            <Text style={[styles.menuText, { color: '#E74C3C' }]}>Системадан чыгуу</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.version}>SaNabi Bank • Версия 5.12.0</Text>
      </ScrollView>

      {/* --- КЕЛИШИМДЕР МОДАЛЫ --- */}
      <Modal visible={isTermsVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Келишимдер жана шарттар</Text>
              <TouchableOpacity onPress={() => setIsTermsVisible(false)}>
                <Ionicons name="close-circle" size={30} color="#CCC" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.termsScroll}>
              <Text style={styles.termsText}>
                1. Жалпы жоболор{"\n"}
                SaNabi Digital Bank тиркемесин колдонуу менен сиз компаниянын бардык ички эрежелерине макулдугуңузду билдиресиз.{"\n\n"}
                2. Коопсуздук{"\n"}
                Сиз өзүңүздүн PIN-кодуңузду жана жеке маалыматтарыңызды үчүнчү тарапка бербөөгө милдеттүүсүз. Банк кызматкерлери эч качан сиздин кодуңузду сурабайт.{"\n\n"}
                3. Транзакциялар{"\n"}
                Бардык акча которуулар кайтарылгыс болуп саналат. Номерди терүүдө ката кетирсеңиз, банк жоопкерчилик тартпайт.{"\n\n"}
                4. Жашыруундуулук{"\n"}
                Сиздин маалыматтар шифрленген түрдө сакталат жана мыйзам чегинде корголот.
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setIsTermsVisible(false)}>
              <Text style={styles.modalBtnText}>Түшүндүм</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Компоненттер жана Стилдер (ошол бойдон калат, бирок модал кошулду)
function MenuOption({ icon, title, count, onPress }: any) {
  return (
    <TouchableOpacity style={[styles.menuItem, styles.border]} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#1A1A1A" />
      <Text style={styles.menuText}>{title}</Text>
      {count && <Text style={styles.countText}>{count}</Text>}
      <Ionicons name="chevron-forward" size={18} color="#CCC" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerIcon: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  userCard: { alignItems: 'center', padding: 25, backgroundColor: '#FFF', margin: 20, borderRadius: 30, elevation: 2 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#2ECC71', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { color: '#FFF', fontSize: 36, fontWeight: 'bold' },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  editAvatar: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#1A1A1A', padding: 6, borderRadius: 12, borderWidth: 2, borderColor: '#FFF' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  userPhone: { fontSize: 14, color: '#888', marginTop: 5 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 15 },
  statusText: { color: '#2ECC71', fontSize: 12, fontWeight: '700' },
  menuSection: { backgroundColor: '#FFF', borderRadius: 25, paddingHorizontal: 20, marginHorizontal: 20, marginBottom: 20 },
  menuLabel: { fontSize: 11, color: '#AAA', marginTop: 15, marginBottom: 5, textTransform: 'uppercase' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, minHeight: 60 },
  border: { borderBottomWidth: 1, borderBottomColor: '#F8F9FB' },
  menuText: { flex: 1, marginLeft: 15, fontSize: 16, color: '#1A1A1A', fontWeight: '500' },
  countText: { marginRight: 10, color: '#2ECC71', fontSize: 14, fontWeight: 'bold' },
  version: { textAlign: 'center', color: '#CCC', fontSize: 12, marginTop: 20 },
  
  // Modal стилдери
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, maxHeight: height * 0.8 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  termsScroll: { marginBottom: 20 },
  termsText: { fontSize: 15, color: '#444', lineHeight: 22 },
  modalBtn: { backgroundColor: '#1A1A1A', padding: 18, borderRadius: 20, alignItems: 'center' },
  modalBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});