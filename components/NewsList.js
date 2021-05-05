import React from 'react';
import { StyleSheet, Text, View, FlatList, ToastAndroid } from 'react-native';
import { parse } from 'fast-xml-parser';
import NewsCard from './NewsCard'

const NewsList = ({navigation}) => {

  const API_URL = 'https://feeds.24.com/articles/Fin24/Tech/rss';

  const [news, setNews] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getNews = async () => {
    setRefreshing(true);
    fetch(API_URL)
      .then((response) => response.text())
      .then((textResponse) => {
        setRefreshing(false);
        ToastAndroid.show("News updated!", ToastAndroid.SHORT);
        let data = parse(textResponse);
        if (data && data.rss && data.rss.channel && data.rss.channel.item) {
          let _news = data.rss.channel.item;
          const modifiedNews = _news.map((item) => {
            let title = item.title.split('|');
            item.source = title[0];
            item.title = title[1];
            return item;
          });
          setNews(modifiedNews);
        }
      })
      .catch((error) => {
        setRefreshing(false);
        console.log(error);
      });
  };

  const refreshNews = () => {
    getNews();
  };

  React.useEffect(() => {
    getNews()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
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
  },
})
