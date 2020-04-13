import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Notification from 'react-notify-toast'
import './styles/main.scss'
import 'bulma'

import Home from './components/common/Home'
import Heros from './components/heros-comp/HeroIndex'
import HerosShow from './components/heros-comp/HeroShow'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import HerosNew from './components/heros-comp/HeroNew'
import HeroEdit from './components/heros-comp/HeroEdit'
import SecureRoute from './components/common/SecureRoute'
import ErrorPage from './components/common/ErrorPage'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Notification /> 
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <SecureRoute path="/heros/:id/edit" component={HeroEdit} />
            <SecureRoute path="/heros/new" component={HerosNew} />
            <Route path="/heros/:id" component={HerosShow} />
            <Route path="/heros" component={Heros} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/*" component={ErrorPage} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
