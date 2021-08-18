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

    function submitHandler(e) {
        console.log(formData);
        e.preventDefault();
        updateDeck(formData).then(() => history.push(`/decks/${deckId}`));
        
      }
    
    function changeName(e) {
    setFormData({ ...formData, name: e.target.value });
  }

  function changeDesc(e) {
    setFormData({ ...formData, description: e.target.value });
  }

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
                <form onSubmit= {submitHandler} >
                    
                    <label>Name</label>
                    <br />
                        <input 
                        type="text"
                        required
                        onChange={changeName}
                        value= {formData.name}
                        
                        />
                    <br />
                    <label>Description</label>
                    <br />
                        <textarea
                        required
                        onChange={changeDesc}
                        value= {formData.description}
                        
                        
                        />
                    <br />
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

   
export default DeckEdit;