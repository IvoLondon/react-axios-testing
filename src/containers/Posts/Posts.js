import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import './Posts.css'

class Posts extends Component {
	state = {
        posts : [],
        selectedPostId : null,
        err : false, 
    }
    componentDidMount() {
        axios.get('/posts')
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
    render() {
    	let posts = this.state.posts.map(post => {
            return <Post    key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.getSelectedIdHandler(post.id)}
                    />
        })
        if(!this.state.err) {
        	return (
		    	<section className="Posts">
		            {posts}
		        </section>
		    )
		} else {
			return (
                <p style={{textAlign : 'center'}}>Something went wrong, please try again!</p>
            )
		}
    }
}

export default Posts;