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

 const slides = [
   {
     key: 'one',
     title: 'Welcome to CapNews',
     text: 'Amazing React Native app with cool features',
     image: require('./assets/1.png'),
     backgroundColor: '#00C1CC',
   },
   {
     key: 'two',
     title: 'News feeds',
     text: 'Keep up to date with latest tech news',
     image: require('./assets/2.png'),
     backgroundColor: '#febe29',
   },
   {
     key: 'three',
     title: 'More',
     text: 'Many more exiting features baking..',
     image: require('./assets/3.png'),
     backgroundColor: '#59B2AC',
   }
 ];
 type Item = typeof slides[0];

 const App = () => {
   const [firstLaunch, setFirstLaunch] = React.useState(false);

   const appIntroDone = () => {
     setFirstLaunch(false);
   }

   const _renderItem = ({item}: {item: Item}) => {
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

   const _keyExtractor = (item: Item) => item.key;

   if (firstLaunch) {
     return (
       <View style={{flex: 1}}>
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
       <NewsList/>
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
