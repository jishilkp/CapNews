import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Feeds = () => {
    return (
        <View style={styles.container}>
         <Text style={styles.message}>Hello Feeds</Text>
       </View>
    )
}

export default Feeds;

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
   message: {
     fontWeight: '700',
   },
})
