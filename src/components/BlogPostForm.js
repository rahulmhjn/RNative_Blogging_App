import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button } from 'react-native';
// import BlogContext from '../context/BlogContext';


const BlogPostForm = ({ onSubmit, initialValues }) => {

    const [title,setTitle] = useState(initialValues.title);
    const [content,setContent] = useState(initialValues.content);

    // const {data, addBlogPost} = useContext(BlogContext)
    return (
        <View>
            <Text style={styles.text} >Enter Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
            <Text style={styles.text} >Enter Content</Text>
            <TextInput style={styles.input} value={content} onChangeText={(text) => setContent(text)} />
            <Button 
                title="Save Blog Post"
                onPress={() => onSubmit(title, content)} 
             />
        </View>
    )
};

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};


const styles= StyleSheet.create({
    input: {
        margin: 5,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 15
    },
    text: {
        marginLeft:5
    }
});

export default BlogPostForm;