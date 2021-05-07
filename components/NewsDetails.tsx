import React from 'react';
import { StyleSheet, Linking, Text} from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import {News} from '../models/News';

export interface Props {
    route: {
        params : News
    }
}

const NewsDetails = ({ route }:Props) => {
    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: 'https://www.basicsusa.com/images/technews.jpg' }} />
            <Card.Content>
                <Title>{route.params.title}</Title>
                <Paragraph>{route.params.description}</Paragraph>
            </Card.Content>
            <Text style={styles.cardTexts}>{route.params.pubDate}</Text>
            <Text style={styles.cardTexts}>{route.params.source}</Text>
            <Button mode="contained" style={styles.bottomButton} onPress={() => Linking.openURL(route.params.link)}>
                Read More
            </Button>
        </Card>
    )
}

export default NewsDetails;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginBottom: 20
    },
    cardTexts: {
        marginHorizontal: 15,
        marginTop: 10,
        color: '#7F8C8D'
    },
    bottomButton: {
        position: 'absolute',
        bottom:5,
        width: '95%',
        alignSelf: 'center'
    }
})
