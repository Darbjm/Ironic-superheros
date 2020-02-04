import React from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'
import HeroForm from './HeroForm'

class HeroNew extends React.Component {
  state = {
    data: {
      name: '',
      power: '',
      evil: '',
      irony: '',
      image: ''
    }
  }
  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }
  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/heros', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/heros/${res.data._id}`)
      console.log(res)
    } catch (err) {
      console.log(err.response)
    }
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <HeroForm 
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </section>
    )
  }
}
export default HeroNew
