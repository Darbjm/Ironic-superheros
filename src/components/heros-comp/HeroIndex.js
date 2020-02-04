import React from 'react'
import axios from 'axios'
import HeroCard from './HeroCard'

class HeroIndex extends React.Component {
  state = { heros: [] }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/heros')
      this.setState({ heros: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.heros.map(hero =>( 
              <HeroCard key={hero._id} {...hero}/>
            ))}
          </div>
        </div>
      </section>
    )
  }
}
export default HeroIndex