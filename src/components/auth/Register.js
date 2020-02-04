import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = ({ target: { name, value } }) => { // e is an object that has a value of target, target is an object with values: name and value so this is short hand for e.target.name which are set in the html
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()

    console.log('submitting', this.state.data)
    try {
      const res = await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
      console.log(res)
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <form className="column is-half is-offset-one-quarter" onSubmit={this.handleSubmit}>
              <h2 className="title">Register</h2>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input 
                    className="input"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input 
                    className="input"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input 
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input 
                    className="input"
                    type="password"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">Register Me</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default Register