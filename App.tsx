import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import NewsList from './components/NewsList';
import NewsDetails from './components/NewsDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Slide = {
  key: string;
  title: string;
  text: string;
  image: string;
  backgroundColor: string;
};

const slides: Slide[] = [
  {
    key: 'one',
    title: 'Welcome to CapNews',
    text: 'Amazing React Native app with cool features',
    image: require('./assets/1.jpg'),
    backgroundColor: '#00C1CC',
  },
  {
    key: 'two',
    title: 'News feeds',
    text: 'Keep up to date with latest tech news',
    image: require('./assets/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'More',
    text: 'Many more exiting features baking..',
    image: require('./assets/3.jpg'),
    backgroundColor: '#59B2AC',
  }
];

const Stack = createStackNavigator();

const App = () => {
  const FIRST_LAUNCH_STORAGE_KEY: string = 'first_launch';

  const [firstLaunch, setFirstLaunch] = React.useState<boolean>(true);

  const setFirstLaunchStatus = async () => {
    try {
      const value = await AsyncStorage.getItem(FIRST_LAUNCH_STORAGE_KEY);
      let isFirstLaunch: boolean = value != null ? JSON.parse(value) : true;
      setFirstLaunch(isFirstLaunch);
    } catch(error) {
      setFirstLaunch(false);
    }
  };

  React.useEffect(() => {
    setFirstLaunchStatus();
  }, []);

  const appIntroDone = async () => {
    setFirstLaunch(false);
    try {
      await AsyncStorage.setItem(FIRST_LAUNCH_STORAGE_KEY, JSON.stringify(false));
    } catch (error) {
      console.log(error);
    }
  }

  const _renderItem = ({ item }: { item: Slide }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.backgroundColor,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.description}>{item.text}</Text>
      </View>
    );
  };

  const _keyExtractor = (item: Slide) => item.key;


  if (firstLaunch) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
          data={slides}
          onDone={() => appIntroDone()}
        />
      </View>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="NewsList" component={NewsList} options={{headerShown: false}}/>
          <Stack.Screen name="NewsDetails" component={NewsDetails} options={{ title: 'Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  }
});

export default App;
