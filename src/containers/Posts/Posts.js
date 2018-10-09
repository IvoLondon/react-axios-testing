import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost'
import {withRouter, Link, Route} from 'react-router-dom'
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
         this.props.history.push({
             pathname : '/home/' + id
         });
    }

    render() {
    	let posts = this.state.posts.map(post => {
            return(
                // <Link to={"/" + post.id} key={post.id}>
                    <Post    
                        title={post.title}
                        key={post.id}
                        author={post.author}
                        clicked={() => this.getSelectedIdHandler(post.id)}
                    />
                // </Link>
            )
        })
        if(!this.state.err) {
            console.log(this.props);
        	return (
                <div>
    		    	<section className="Posts">
    		            {posts} 
    		        </section>
                    <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
                </div>
		    )
		} else {
			return (
                <p style={{textAlign : 'center'}}>Something went wrong, please try again!</p>
            )
		}
    }
}

export default withRouter(Posts);