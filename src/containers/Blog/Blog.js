import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Posts from '../Posts/Posts';
import FullPost from '../../components/FullPost/FullPost'
import NewPost from '../../components/NewPost/NewPost'
import './Blog.css';

class Blog extends Component {
    
    render () {
        
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink activeClassName="active-btn" activeStyle={{color:'red'}} to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={{ pathname : '/new-post', hash : '#search' }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path='/' exact component={Posts} />
                    <Route path='/new-post' component={NewPost} />
                    <Route path='/:id' exact component={FullPost} />
                </Switch>
            </div>
        );
        
    }
}

export default Blog;