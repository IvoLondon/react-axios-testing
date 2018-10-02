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
        err : false,
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
        })
        .catch((err) => {
            this.setState({
                err : true
            })
        });
    }
    getSelectedIdHandler = (id) => {
        this.setState({
            selectedPostId : id
        });
    }
    render () {
        let posts = this.state.posts.map(post => {
            return <Post    key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.getSelectedIdHandler(post.id)}
                    />
        })
        if(!this.state.err) {
            return (
                <div>
                    <section className="Posts">
                        {posts}
                    </section>
                    <section>
                        <FullPost id={this.state.selectedPostId} />
                    </section>
                    <section>
                        <NewPost />
                    </section>
                </div>
            );
        } else {
            return (
                <p style={{textAlign : 'center'}}>Something went wrong, please try again!</p>
            )
        }
        
    }
}

export default Blog;