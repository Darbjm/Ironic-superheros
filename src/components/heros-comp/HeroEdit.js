import React from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'
import HeroForm from './HeroForm'

class HeroEdit extends React.Component {
  state = {
    data: {
      name: '',
      power: '',
      evil: '',
      irony: '',
      image: ''
    }
  }
  async componentDidMount() {
    const heroId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/heros/${heroId}`)
      this.setState({ data: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }
  handleSubmit = async e => {
    e.preventDefault()
    const heroId = this.props.match.params.id
    try {
      console.log(this.state.data)
      const { data } = await axios.put(`/api/heros/${heroId}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/heros/${data._id}`)
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }
  render() {
    return (
      <section className='section'>
        <div className='container'>
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
export default HeroEdit