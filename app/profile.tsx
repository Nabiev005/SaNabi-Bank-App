import React, { useState, useEffect } from 'react'; // useEffect кошулду
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert, Share, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
// 1. AsyncStorage импорттоо (Терминалдан орнотуу: npx expo install @react-native-async-storage/async-storage)
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  // 2. Тиркеме же бул барак ачылганда сакталган сүрөттү жүктөп алуу
  useEffect(() => {
    loadSavedImage();
  }, []);

  const loadSavedImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('user_profile_image');
      if (savedImage !== null) {
        setImage(savedImage);
      }
    } catch (e) {
      console.log("Сүрөттү жүктөөдө ката:", e);
    }
  };

  // 3. Сүрөт тандоо жана аны сактоо
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Ката', 'Сүрөт тандаш үчүн галереяга уруксат беришиңиз керек!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5, // Сапатын бир аз азайтып сактасак, тезирээк жүктөлөт
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImage(selectedUri);
      
      // Сүрөттүн жолун (URI) телефондун эсине сактоо
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
        message: 'SaNabi Bank - Үч муундун ишеними! Тиркемени жүктөп алыңыз: https://sanabi.kg',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Чыгуу",
      "Сиз чын эле профилиңизден чыгууну каалайсызбы?",
      [
        { text: "Жок", style: "cancel" },
        { text: "Ооба", onPress: () => router.replace('/') } 
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Ionicons name="close" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Профиль</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={() => Alert.alert("Жөндөөлөр", "Профиль жөндөөлөрү жакында кошулат")}>
          <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>А</Text>
            )}
            <TouchableOpacity 
              style={styles.editAvatar}
              onPress={pickImage}
            >
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

        <View style={styles.menuSection}>
          <Text style={styles.menuLabel}>Финансы жана Коопсуздук</Text>
          <MenuOption icon="card-outline" title="Менин карталарым" count="3" onPress={() => router.push('/cards')} />
          <MenuOption icon="key-outline" title="PIN-кодду өзгөртүү" onPress={() => Alert.alert("Коопсуздук", "Эски PIN-кодду киргизиңиз")} />
          
          <View style={[styles.menuItem, styles.border]}>
            <Ionicons name="finger-print-outline" size={22} color="#1A1A1A" />
            <Text style={styles.menuText}>FaceID / TouchID</Text>
            <Switch value={faceIdEnabled} onValueChange={setFaceIdEnabled} trackColor={{ false: "#D1D1D1", true: "#2ECC71" }} thumbColor={"#FFF"} />
          </View>

          <View style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color="#1A1A1A" />
            <Text style={styles.menuText}>Билдирмелер</Text>
            <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ false: "#D1D1D1", true: "#2ECC71" }} thumbColor={"#FFF"} />
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuLabel}>Колдоо жана Маалымат</Text>
          <MenuOption icon="chatbubble-ellipses-outline" title="Жардам кызматы (Чат)" onPress={() => router.push('/chat')} />
          <MenuOption icon="share-social-outline" title="Досторго сунуштоо" onPress={onShare} />
          <MenuOption icon="document-text-outline" title="Келишимдер жана шарттар" onPress={() => Alert.alert("Келишим", "SaNabi Bank пайдалануу эрежелери...")} />
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#E74C3C" />
            <Text style={[styles.menuText, { color: '#E74C3C' }]}>Системадан чыгуу</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.version}>SaNabi Bank • Версия 5.12.0</Text>
        <Text style={styles.madeBy}>Made for Aybek Nabiev</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuOption({ icon, title, count, onPress, isLast }: any) {
  return (
    <TouchableOpacity style={[styles.menuItem, !isLast && styles.border]} onPress={onPress} activeOpacity={0.7}>
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
  userCard: { alignItems: 'center', padding: 25, backgroundColor: '#FFF', margin: 20, borderRadius: 30, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#2ECC71', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { color: '#FFF', fontSize: 36, fontWeight: 'bold' },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  editAvatar: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#1A1A1A', padding: 6, borderRadius: 12, borderWidth: 2, borderColor: '#FFF' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  userPhone: { fontSize: 14, color: '#888', marginTop: 5 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 15 },
  statusText: { color: '#2ECC71', fontSize: 12, fontWeight: '700' },
  menuSection: { backgroundColor: '#FFF', borderRadius: 25, paddingHorizontal: 20, marginHorizontal: 20, marginBottom: 20 },
  menuLabel: { fontSize: 11, color: '#AAA', marginTop: 15, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, minHeight: 60 },
  border: { borderBottomWidth: 1, borderBottomColor: '#F8F9FB' },
  menuText: { flex: 1, marginLeft: 15, fontSize: 16, color: '#1A1A1A', fontWeight: '500' },
  countText: { marginRight: 10, color: '#2ECC71', fontSize: 14, fontWeight: 'bold', backgroundColor: '#F0F9F4', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  version: { textAlign: 'center', color: '#CCC', fontSize: 12, marginTop: 20 },
  madeBy: { textAlign: 'center', color: '#EEE', fontSize: 10, marginTop: 5 }
});