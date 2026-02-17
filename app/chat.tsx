import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Саламатсызбы! Мен SANABI жардамчысымын. Сизге кантип жардам бере алам?', isUser: false, time: '10:00' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // 1. Билдирүүлөрдү телефондун эсинен жүктөө
  useEffect(() => {
    loadMessages();
  }, []);

  // 2. Билдирүүлөр өзгөргөн сайын аларды сактоо
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const saveMessages = async (msgs: any) => {
    try {
      await AsyncStorage.setItem('chat_history', JSON.stringify(msgs));
    } catch (e) {
      console.log('Сактоодо ката кетти', e);
    }
  };

  const loadMessages = async () => {
    try {
      const saved = await AsyncStorage.getItem('chat_history');
      if (saved !== null) setMessages(JSON.parse(saved));
    } catch (e) {
      console.log('Жүктөөдө ката кетти', e);
    }
  };

  // 3. Боттун жооп берүү логикасы
  const getBotResponse = (userText: string) => {
    const text = userText.toLowerCase();
    if (text.includes('салам')) return 'Саламатсызбы! Кандайсыз?';
    if (text.includes('баланс')) return 'Сиздин учурдагы балансыңыз: 54 500 сом.';
    if (text.includes('курс')) return 'Бүгүнкү курс: USD 89.5, EUR 97.2.';
    if (text.includes('карта')) return 'Сизде 1 активдүү VISA Platinum картасы бар.';
    if (text.includes('рахмат')) return 'Эч нерсе эмес! Ар дайым кызматыңыздамын. 😊';
    return 'Кечириңиз, мен сизди түшүнбөй калдым. Сурооңузду башкачараак берип көрүңүзчү?';
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now().toString(), text: input, isUser: true, time: currentTime };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');

    // Боттун жообу (1 секунддан кийин)
    setTimeout(() => {
      const botMsg = { 
        id: (Date.now() + 1).toString(), 
        text: getBotResponse(input), 
        isUser: false, 
        time: currentTime 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.onlineDot} />
          <Text style={styles.headerTitle}>SANABI Колдоо кызматы</Text>
        </View>
        {/* Тарыхты тазалоо баскычы */}
        <TouchableOpacity onPress={() => setMessages([])}>
          <Ionicons name="trash-outline" size={20} color="#FF5252" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()} // Жаңы билдирүү келгенде ылдый түшүрөт
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.messageText, item.isUser ? { color: '#FFF' } : { color: '#1A1A1A' }]}>{item.text}</Text>
            <Text style={[styles.timeText, item.isUser ? { color: '#E0E0E0' } : { color: '#AAA' }]}>{item.time}</Text>
          </View>
        )}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={90}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.chatInput}
            placeholder="Билдирүү жазыңыз..."
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#2ECC71" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerInfo: { flex: 1, marginLeft: 15, flexDirection: 'row', alignItems: 'center' },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2ECC71', marginRight: 8 },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },
  messageBubble: { maxWidth: '85%', padding: 12, borderRadius: 20, marginBottom: 12, elevation: 1 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#2ECC71', borderBottomRightRadius: 2 },
  botBubble: { alignSelf: 'flex-start', backgroundColor: '#F0F0F0', borderBottomLeftRadius: 2 },
  messageText: { fontSize: 15, lineHeight: 20 },
  timeText: { fontSize: 10, alignSelf: 'flex-end', marginTop: 4 },
  inputRow: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F0F0F0', backgroundColor: '#FFF' },
  chatInput: { flex: 1, backgroundColor: '#F5F5F5', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, maxHeight: 100 },
  sendBtn: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }
});