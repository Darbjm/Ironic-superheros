import React from 'react'
const HeroForm = ({  data, handleChange, handleSubmit }) => {
  return (
    <div className="columns">
      <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">power</label>
          <div className="control">
            <input 
              className="textarea"
              placeholder="Power"
              name="power"
              onChange={handleChange}
              value={data.power}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Good or evil?</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Good or evil"
              name="evil"
              onChange={handleChange}
              value={data.evil}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">irony level</label>
          <div className="control">
            <textarea 
              className="input"
              placeholder="1-10"
              name="irony"
              onChange={handleChange}
              value={data.irony}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Image URL"
              name="image"
              onChange={handleChange}
              value={data.image}
            />
          </div>
        </div>
        <div className="field">
          <button type="submit" className="button is-fullwidth is-warning">Make an ironic Hero 🦸🏼‍♂️</button>
        </div>
      </form>
    </div>
  )
}
export default HeroForm