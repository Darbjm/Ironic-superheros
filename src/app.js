import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import './styles/main.scss'
import 'bulma'

import Home from './components/common/Home'
import Heros from './components/Heros/HeroIndex'
import HerosShow from './components/Heros/HeroShow'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import HerosNew from './components/Heros/HeroNew'
import HeroEdit from './components/Heros/HeroEdit'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/heros/:id/edit' component={HeroEdit} />
            <Route path='/heros/new' component={HerosNew} />
            <Route path='/heros/:id' component={HerosShow} />
            <Route path='/heros' component={Heros} />
            <Route path='/register' component={Register} />
            <Route path="/login" component={Login} />
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

// async function getData() {
//   const response = await fetch('/api/athletes')
//   console.log('working')
//   const data = await response.json()
//   console.log(data)
// }

// getData()