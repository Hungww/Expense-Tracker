import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ForumFeed from '../components/ForumFeed';


const ForumScreen = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}
        >
            <ForumFeed/>
        </View>
    );
};


export default ForumScreen;