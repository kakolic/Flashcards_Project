import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";


function DeckEdit() {    
    const {deckId} = useParams();
    const history = useHistory();
    const state = {name: "", description: ""};
    const [formData, setFormData]= useState(state);

 
    const [deck, setDeck]= useState({});
    

    useEffect(() => {
        const abortController = new AbortController();
       const loadDeck= async ()=> {
                const newDeck = await readDeck(deckId, abortController.signal);
                setDeck(()=> newDeck);
                setFormData({
                    id:deckId,
                    name: newDeck.name,
                    description:newDeck.description,
                })
        }
        loadDeck()
        return () => abortController.abort();
    }, [deckId]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const deck = await updateDeck(formData);
            history.push(`/decks/${deck.id}`)
        }
    
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.Name]: event.target.value });
      };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/decks/${deckId}`)
    }

  
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Edit Deck
                </div>
                <h2>Edit Deck</h2>
                <form onSubmit={handleSubmit}>
                    
                    <label>Name</label>
                    <br />
                        <input 
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.name}
                        />
                    <br />
                    <label>Description</label>
                    <br />
                        <textarea
                        required
                        onChange={handleChange}
                        value={formData.description}
                        />
                    <br />
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

   
export default DeckEdit;