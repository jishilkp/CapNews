import React from 'react';
import { StyleSheet, Linking, Text } from 'react-native';
import { Button, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import Constants from '../config/Constants';
import {News} from '../models/News';

export interface Props {
    data: News,
    navigation: any
}

const NewsCard = ({data, navigation}: Props) => {
    const goToDetails = () => {
        navigation.navigate('NewsDetails', data);
    };

    return (
        <TouchableRipple
            onPress={() => goToDetails()}
            rippleColor="rgba(0, 0, 0, .32)">
            <Card style={styles.card}>
                <Card.Cover source={Constants.NEWS_DEFAULT_IMAGE_URI} />
                <Card.Content>
                    <Title>{data.title}</Title>
                    <Paragraph>{data.description}</Paragraph>
                </Card.Content>

                <Text style={styles.cardTexts}>{data.pubDate}</Text>
                <Text style={styles.cardTexts}>{data.source}</Text>

                <Card.Actions style={{ alignSelf: "flex-end" }}>
                    <Button onPress={() => Linking.openURL(data.link)}>Read More</Button>
                </Card.Actions>
            </Card>
        </TouchableRipple>
    )
}

export default NewsCard;

const styles = StyleSheet.create({
    card: {
        marginBottom: 20
    },
    cardTexts: {
        marginHorizontal: 15,
        marginTop: 10,
        color: '#7F8C8D'
    }
});
