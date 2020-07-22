import React, {  useContext } from 'react';
import { StyleSheet } from 'react-native';
import BlogContext from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm'


const EditScreen = ({ navigation }) => {

    const id = navigation.getParam('id');
    const {data, editBlogPost} = useContext(BlogContext);

    const blogPost = data.find((blogPost) => blogPost.id == navigation.getParam('id'))
    

    return <BlogPostForm 
        initialValues = {{title: blogPost.title, content: blogPost.content }}
        onSubmit = {(title,content) => 
            editBlogPost(id, title, content,() => navigation.pop())
        } 
        />
};


const styles = StyleSheet.create({});

export default EditScreen;