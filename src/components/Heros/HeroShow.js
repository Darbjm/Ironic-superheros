import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../lib/Auth'

class HerosShow extends React.Component {
  state = { hero: null }
  async componentDidMount() {
    const heroId = this.props.match.params.id

    try {
      const res = await axios.get(`/api/heros/${heroId}`)
      this.setState({ hero: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  handleDelete = async () => {
    const heroId = this.props.match.params.id
    try {
      await axios.delete(`api/heros/${heroId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('api/heros')
    } catch (err) {
      console.log(err.response)
    }
  }
  
  isOwner = () => Auth.getPayload().sub === this.state.hero.user._id
  render() {
    console.log(this.state)
    console.log(Auth.getPayload().sub)
    const { hero } = this.state
    if (!hero) return null
    return (
      <section className="section">
        <div className="container">
          <h2 className="title">{hero.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={hero.image} alt={hero.name} />
              </figure>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">Power</h4>
              <p>{hero.power}</p>
              <hr />
              <h4 className="title is-4">Side</h4>
              <hr />
              <p>{hero.evil}</p>
              <hr />
              <h4 className="title is-4">Irony level</h4>
              <hr />
              <p>{hero.irony}</p>
              <hr />
              {this.isOwner() && 
                <>
                 <Link to={`/heros/${hero._id}/edit`} className="button is-warning">Edit Hero</Link>
                  <hr />
                  <button onClick={this.handleDelete} className="button is-danger">Delete Hero ☠️</button>
                </>
              }
            </div>
          </div>
        </div>
      </section>
    )
  }

}
export default HerosShow