import React from 'react';
import { StyleSheet, Text, View, FlatList, ToastAndroid } from 'react-native';
import { parse } from 'fast-xml-parser';
import NewsCard from './NewsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsList = ({navigation}) => {

  const API_URL = 'https://feeds.24.com/articles/Fin24/Tech/rss';
  const STORAGE_KEY = 'news_data';

  const [news, setNews] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getNewsFromStorage = async () => {
    let cachedNews = [];
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if(data) {
        cachedNews = JSON.parse(data);
      }
      return cachedNews;
    } catch(error) {
      return cachedNews;
    }
  };

  const setNewsToStorage = async (cachedNews) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cachedNews));
    } catch (error) {
      console.log(error);
    }
  };

  const getNewsFromApi = async () => {
    setRefreshing(true);
    fetch(API_URL)
      .then((response) => response.text())
      .then(async (textResponse) => {
        setRefreshing(false);
        ToastAndroid.show("News updated!", ToastAndroid.SHORT);
        let data = parse(textResponse);
        if (data && data.rss && data.rss.channel && data.rss.channel.item) {
          let _news = data.rss.channel.item;
          // Removed source name from the news title
          // Added a new key source
          const modifiedNews = _news.map((item) => {
            let title = item.title.split('|');
            item.source = title[0];
            item.title = title[1];
            return item;
          });
          setNews(modifiedNews);
          setNewsToStorage(modifiedNews);
        } else {
          const _news = await getNewsFromStorage();
          setNews(_news);
        }
      })
      .catch(async (error) => {
        setRefreshing(false);
        let _news = await getNewsFromStorage();
        setNews(_news);
      });
  };

  const refreshNews = () => {
    getNewsFromApi();
  };

  React.useEffect(() => {
    getNewsFromApi()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cap News</Text>
      <FlatList style={styles.itemsList}
        data={news}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          return (
            <NewsCard data={item} navigation={navigation}/>
          )
        }}
        refreshing={refreshing}
        onRefresh={() => refreshNews()}
      />
    </View>
  )
}

export default NewsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F3F4'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20
  }
})
