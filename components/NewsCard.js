import React from 'react';
import { StyleSheet, Linking, Text} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const NewsCard = (props) => {

    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: 'https://www.basicsusa.com/images/technews.jpg' }} />
            <Card.Content>
                <Title>{ props.data.title }</Title>
                <Paragraph>{ props.data.description }</Paragraph>
            </Card.Content>

            <Text style={styles.newsDate}>{ props.data.pubDate }</Text>

            <Card.Actions style={{ alignSelf: "flex-end" }}>
                <Button onPress={() => Linking.openURL(props.data.link)}>Read More</Button>
            </Card.Actions>
        </Card>
    )
}

export default NewsCard;

const styles = StyleSheet.create({
    card: {
        marginBottom: 20
    },
    newsDate: {
        marginHorizontal: 15,
        marginTop: 10,
        color: '#7F8C8D'
    }
})
