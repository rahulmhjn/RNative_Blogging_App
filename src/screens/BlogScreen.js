import React, {useContext,useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BlogContext from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons';

const BlogScreen = ({ navigation }) => {
    const id = navigation.getParam('id');

    const { data, getBlogPosts } = useContext(BlogContext);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        };
    }, []);

    const blogPost = data.find((blogPost) => blogPost.id === id);

    


    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
        
    )
};

BlogScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
        <TouchableOpacity onPress={() => {navigation.navigate('Edit', { id: navigation.getParam('id') })}}>
            <EvilIcons name="pencil" size={35} color="black" style={{marginRight:10}} />
        </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({});


export default BlogScreen;

