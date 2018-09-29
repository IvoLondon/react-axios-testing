import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts : [],
        selectedPostId : null,
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const post = response.data.slice(0, 4);
            const updatedPosts = post.map(element => {
                return {
                    ...element,
                    author : 'Ivo',
                }
            })
            this.setState({
                posts : updatedPosts
            })
        });
    }
    render () {
        let posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author} />
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPostId={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;