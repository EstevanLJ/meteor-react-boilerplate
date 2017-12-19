import { Router, Route, browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'
import React from 'react'

import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/NotFound'
import Signup from '../ui/Signup'
import Login from '../ui/Login'

const unauthenticatedPage = ['/', '/signup'];
const authenticatedPage = ['/dashboard'];

const onEnterPublicPage = () => {
    if(Meteor.userId()) {
        browserHistory.replace('/dashboard');
    }
}

const onEnterPrivatePage = () => {
    if(!Meteor.userId()) {
        browserHistory.replace('/');
    }
}

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname
    const isAuthenticatedPage = authenticatedPage.includes(pathname)
    const isUnauthenticatedPage = unauthenticatedPage.includes(pathname)

    if(isAuthenticated && isUnauthenticatedPage) {
        browserHistory.replace('/dashboard')
    } else if(!isAuthenticated && isAuthenticatedPage) {
        browserHistory.replace('/')
    }
}

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
        <Route path="*" component={NotFound} />
    </Router>
)