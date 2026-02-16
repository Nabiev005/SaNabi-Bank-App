import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Саламатсызбы! Сизге кантип жардам бере алам?', isUser: false, time: '10:00' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: input, isUser: true, time: '10:05' }]);
    setInput('');
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
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.messageText, item.isUser ? { color: '#FFF' } : { color: '#1A1A1A' }]}>{item.text}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        )}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.chatInput}
            placeholder="Билдирүү жазыңыз..."
            value={input}
            onChangeText={setInput}
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
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerInfo: { marginLeft: 15, flexDirection: 'row', alignItems: 'center' },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2ECC71', marginRight: 8 },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 15, marginBottom: 10 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#2ECC71', borderBottomRightRadius: 2 },
  botBubble: { alignSelf: 'flex-start', backgroundColor: '#F0F0F0', borderBottomLeftRadius: 2 },
  messageText: { fontSize: 15 },
  timeText: { fontSize: 10, color: '#AAA', alignSelf: 'flex-end', marginTop: 4 },
  inputRow: { flexDirection: 'row', padding: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  chatInput: { flex: 1, backgroundColor: '#F5F5F5', padding: 12, borderRadius: 25, marginRight: 10 },
  sendBtn: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }
});