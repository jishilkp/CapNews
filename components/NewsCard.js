import React from 'react';
import { StyleSheet, Linking, Text } from 'react-native';
import { Button, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';

const NewsCard = (props) => {
    const goToDetails = () => {
        props.navigation.navigate('NewsDetails', props.data);
    };

    return (
        <TouchableRipple
            onPress={() => goToDetails()}
            rippleColor="rgba(0, 0, 0, .32)">
            <Card style={styles.card}>
                <Card.Cover source={{ uri: 'https://www.basicsusa.com/images/technews.jpg' }} />
                <Card.Content>
                    <Title>{props.data.title}</Title>
                    <Paragraph>{props.data.description}</Paragraph>
                </Card.Content>

                <Text style={styles.cardTexts}>{props.data.pubDate}</Text>
                <Text style={styles.cardTexts}>{props.data.source}</Text>

                <Card.Actions style={{ alignSelf: "flex-end" }}>
                    <Button onPress={() => Linking.openURL(props.data.link)}>Read More</Button>
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
