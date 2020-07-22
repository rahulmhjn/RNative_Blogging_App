import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import BlogContext from '../context/BlogContext';
import { Feather } from '@expo/vector-icons'; 

const IndexScreen = ({ navigation }) => {
    const {data, deleteBlogPost, getBlogPosts} = useContext(BlogContext);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View style={{flex:1}}>
            <FlatList
                data={data}
                keyExtractor={(data) => data.title }
                renderItem = {({ item }) => {
                    return ( 
                        <TouchableOpacity onPress = {() => navigation.navigate('Blog', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress = {() => deleteBlogPost(item.id)}>
                                    <Feather name="trash" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        )
                }}
            />
        </View>
    )
}

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => ( <TouchableOpacity onPress={() => navigation.navigate('Create')} >
                        <Feather name="plus" color="black" size={30} style={{marginRight:10}} />
                    </TouchableOpacity>
        )
    }
}



const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 18
    }
});

export default IndexScreen;