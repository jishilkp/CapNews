import React from 'react';
import { StyleSheet, Text, View, FlatList, ToastAndroid, Alert } from 'react-native';
import { parse } from 'fast-xml-parser';
import NewsCard from './NewsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationScreenProp } from 'react-navigation';
import uuid from 'react-native-uuid';
import { News } from '../models/News';
import Constants from '../config/Constants';

export interface NewsListScreenProps {
  navigation: NavigationScreenProp<any, any>
};


const NewsList = ({ navigation }: NewsListScreenProps) => {

  const [news, setNews] = React.useState<News[]>([]);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const getNewsFromStorage = async () => {
    let cachedNews: News[] = [];
    try {
      const data = await AsyncStorage.getItem(Constants.STORAGE_KEY);
      if (data) {
        cachedNews = JSON.parse(data);
      }
      return cachedNews;
    } catch (error) {
      return cachedNews;
    }
  };

  const setNewsToStorage = async (cachedNews: News[]) => {
    try {
      await AsyncStorage.setItem(Constants.STORAGE_KEY, JSON.stringify(cachedNews));
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = () =>
    Alert.alert(
      "News fetch failed",
      "Please check your internet connectivity and try again!",
      [
        {
          text: "OK",
          style: "cancel",
        },
      ],
      {
        cancelable: true
      }
    );

  const getNewsFromApi = async () => {
    setRefreshing(true);
    fetch(Constants.API_URL)
      .then((response) => response.text())
      .then(async (textResponse) => {
        setRefreshing(false);
        ToastAndroid.show("News updated!", ToastAndroid.SHORT);
        let data = parse(textResponse);
        if (data && data.rss && data.rss.channel && data.rss.channel.item) {
          let _news = data.rss.channel.item;
          // Removed source name from the news title
          // Added a new key source
          const modifiedNews = _news.map((item: News) => {
            let title = item.title.split('|');
            item.source = title[0];
            item.title = title[1];
            item.key = uuid.v4() as string;

            return item;
          });
          setNews(modifiedNews);
          setNewsToStorage(modifiedNews);
        } else {
          const _news: News[] = await getNewsFromStorage();
          setNews(_news);
        }
      })
      .catch(async (error) => {
        showAlert();
        Alert.showAlert()
        setRefreshing(false);
        let _news: any = await getNewsFromStorage();
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
      <FlatList
        data={news}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          return (
            <NewsCard data={item} navigation={navigation} />
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
