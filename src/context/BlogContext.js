import React, { useState } from 'react';
import jsonServer from '../api/jsonServer';


const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState([])

    const getBlogPosts = async () => {
        const response = await jsonServer.get('/blogposts');

        setBlogPosts(response.data);
    }

    const addBlogPost = async (title, content,callback) => {
        // setBlogPosts([...blogPosts,{
        //     id: Math.floor(Math.random() * 99999),
        //     title: title,
        //     content: content
        // }]);
        // callback();
        await jsonServer.post('/blogposts', { title, content });
        
        if(callback){
            callback();
        }
    }
    const deleteBlogPost = async (id) => {
        // setBlogPosts(blogPosts.filter((blogPost) => blogPost.id !== id))
        await jsonServer.delete(`/blogposts/${id}`);
        getBlogPosts();
    }

    const editBlogPost = async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content});
        // setBlogPosts(blogPosts.map((blogPost) => {
        //     if(blogPost.id === id){
        //         return {id,title,content}
        //     }
        //     else{
        //         return blogPost
        //     }
        // }));
        callback();

        
    }

    return <BlogContext.Provider value={{
        data: blogPosts, 
        addBlogPost: addBlogPost, 
        deleteBlogPost: deleteBlogPost,
        editBlogPost: editBlogPost,
        getBlogPosts: getBlogPosts
        }}>
        {children}
    </BlogContext.Provider>
};


export default BlogContext;
