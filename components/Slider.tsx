import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native';
import { Slide } from '../models/Slide';
import AppIntroSlider from 'react-native-app-intro-slider';
import Constants from '../config/Constants';

const Slider = (props: any) => {

    const appIntroDone = async () => {
        props.onComplete();
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

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppIntroSlider
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                data={Constants.SLIDES}
                onDone={() => appIntroDone()}
            />
        </View>
    )
}

export default Slider;

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
