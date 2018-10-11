import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from '../Posts/Posts';
import FullPost from '../../components/FullPost/FullPost'
//import NewPost from '../../components/NewPost/NewPost'
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('../../components/NewPost/NewPost')
});

class Blog extends Component {
    state = {
        auth : true,
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink activeClassName="active-btn" activeStyle={{color:'red'}} to="/home">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={{ pathname : '/new-post', }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    { this.state.auth ? <Route path='/new-post' component={AsyncNewPost} /> : null }
                    <Route path='/home' component={Posts} />
                    <Route render={() => <h1>404 baby</h1>} />
                
                </Switch>
            </div>
        );
        
    }
}

export default Blog;