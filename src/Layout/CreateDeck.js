import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";


//allows the user to create a new Deck 
function CreateDeck() {
    const state = {Name: "", Description:""}
    const [formData, setFormData]= useState(state);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        const deck = { formData }
        createDeck(deck)
        .then(response => {
            console.log(response)
            history.push(`/decks/${response.id}`)
        })
    };
    
    const handleCancel = (event) => {
        event.preventDefault();
        history.push("/")
    };

    return (
        <div>
            <div>
                <Link to="/">Home</Link> / <div>Create Deck</div>
            </div>
            <form onSubmit={handleSubmit} >
                <label>Name</label>
                <br />
                    <input 
                    type="text" 
                    required
                    onChange={(e) => setFormData(e.target.value)} 
                    value={formData.name} 
                    />
                <br />
                <label>Description</label>
                <br />
                    <textarea
                    required
                    onChange={(e) => setFormData(e.target.value)}
                    value={formData.Description}
                    />
                <br />
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default CreateDeck;
