const Constants =  {
    API_URL : 'https://feeds.24.com/articles/Fin24/Tech/rss',FIRST_LAUNCH_STORAGE_KEY : 'first_launch',
    STORAGE_KEY : 'news_data',
    NEWS_DEFAULT_IMAGE_URI : require('../assets/news.jpg'),

    SLIDES: [
        {
            key: 'one',
            title: 'Welcome to CapNews',
            text: 'Amazing React Native app with cool features',
            image: require('../assets/1.jpg'),
            backgroundColor: '#00C1CC',
        },
        {
            key: 'two',
            title: 'News feeds',
            text: 'Keep up to date with latest tech news',
            image: require('../assets/2.jpg'),
            backgroundColor: '#febe29',
        },
        {
            key: 'three',
            title: 'More',
            text: 'Many more exiting features baking..',
            image: require('../assets/3.jpg'),
            backgroundColor: '#59B2AC',
        }
    ],
};

export default Constants;