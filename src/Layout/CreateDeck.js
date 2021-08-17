import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";


//allows the user to create a new Deck 
function CreateDeck() {
    const state = {name: "", description:""}
    const [formData, setFormData]= useState(state);
    const history = useHistory();

  const handleSubmit = (event) => {
        event.preventDefault();

       
        createDeck(formData)
        .then(response => {
            console.log(response)
            history.push(`/decks/${response.id}`)
        })
    };
    
    const handleCancel = (event) => {
        event.preventDefault();
        history.push("/")
    };
  
  
  const handleChange= (e)=> {
    console.log(formData);
    console.log(e.target.name)
    setFormData({...formData,[e.target.name]:e.target.value})
  
  }
    return (
        <div>
            <div>
                <Link to="/">Home</Link> / <div>Create Deck</div>
            </div>
            <form onSubmit={handleSubmit} >
                <label>Name</label>
                <br />
                    <input name= "name"
                    type="text" 
                    required
                    onChange={handleChange} 
                    value={formData.name} 
                    />
                <br />
                <label>Description</label>
                <br />
                    <textarea name = "description"
                    required
                    onChange={handleChange}
                    value={formData.description}
                    />
                <br />
                <button type="submit">
                  Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default CreateDeck;
