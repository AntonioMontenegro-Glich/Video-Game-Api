import React, { useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';


const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);

const fetchDatabaseGameApi = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch('https://api.igdb.com/v4/games');
    //Client-ID: 8fmpdcy5fnq32aj1023f5nzax32a9w
    //Authorization: Bearer access_token
    setGames(response.data.Search || []);
  } catch(error){
      console.error('Jogo não encontrado', error);
    }
  }
};

return (
  <View style={styles.container}>
    <TextInput
      placeholder="Digite o nome do Jogo..."
      value={query}
      onChangeText={setQuery}
      style={styles.input}
    />
    <Button mode="contained" onPress={searchGames} style={styles.button}>
      Buscar
    </Button>

    <FlatList
      data={games}
      keyExtractor={(item) => item.imdbID}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.Poster }} />
          <Card.Content>
            <Title>{item.Title}</Title>
            <Paragraph>{item.Year}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Details', { imdbID: item.imdbID })}>
              Ver Detalhes
            </Button>
          </Card.Actions>
        </Card>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 10,
},
input: {
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginBottom: 10,
  padding: 10,
},
button: {
  marginBottom: 10,
},
card: {
  marginBottom: 10,
},
});

export default HomeScreen;
