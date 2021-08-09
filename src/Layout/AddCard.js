import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function AddCard() {
    const {deckId} = useParams();
    const history = useHistory();

    const state = {front:"", back: ""};
    const [cardData, setCardData]= useState(state);
    const [deck, setDeck] = useState(null)
    
    
    useEffect(() => {
        const abortController = new AbortController();
        const loadDeck = async () => {
          const loadedDeck = await readDeck(deckId, abortController.signal);
          setDeck(() => loadedDeck);
        };
        loadDeck();
        return () => abortController.abort();
      }, [deckId]);
    

    const handleDone = (e) => {
        e.preventDefault();
        history.push(`/decks/${deckId}`)
    }

    const handleSubmit = async (event) => { 
        event.preventDefault();
        const card = {cardData}
       await createCard(deckId, card)
       setCardData(state);
    }


    if(deck){
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / <div>Add Card</div>
                </div>
                <div>
                    <h2>{cardData.name}: Add Card</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Front</label>
                    <br />
                    <textarea
                    required
                    value={cardData.front}
                    onChange={(e) => setCardData(e.target.value)}
                    />
                    <br />
                    <label>Back</label>
                    <br />
                    <textarea
                    required
                    value={cardData.back}
                    onChange={(e) => setCardData(e.target.value)}
    
                    />
                    <br />
                    <button onClick={handleDone}>Done</button>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
    return <p>Loading...</p>
}
export default AddCard;