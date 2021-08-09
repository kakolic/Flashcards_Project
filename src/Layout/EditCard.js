import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../utils/api";

function EditCard() {
    const history = useHistory();
    const {deckId,cardId} = useParams();

    const state = {front: "", back: ""}
    const [updatedCard, setUpdatedCard]= useState(state)
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

    
useEffect (()=> {
    const abortController= new AbortController();
    const loadInfo = async ()=> {
        const newDeck = await readDeck(deckId, abortController.signal);
        const newCard= await readCard(cardId)
        setDeck(() => newDeck);
      setCard(() => newCard);
      setUpdatedCard({
        id: cardId,
        front: newCard.front,
        back: newCard.back,
        deckId: Number(deckId),
      });
    };
    loadInfo();
    return () => abortController.abort();
  }, [deckId, cardId]);

 
    const handleCancel = (event) => {
        event.preventDefault();
        history.push("/")
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard(updatedCard);
        history.push(`/decks/${deckId}`);
      };
    

    if(updatedCard){
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{updatedCard.name}</Link>  / Edit Card {updatedCard.id}
                </div>
                <h2>Edit Card</h2>
                <form onSubmit={handleSubmit}>
                    <label>Front</label>
                    <br />
                    <textarea
                    required
                    value={updatedCard.front}
                    onChange={(e) => setUpdatedCard(e.target.value)}
                    />
                    <br />
                    <label>Back</label>
                    <br />
                    <textarea
                    required
                    value={updatedCard.back}
                    onChange={(e) => setUpdatedCard(e.target.value)}
                    />
                    <br />
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
    return <p>Loading...</p>
}
export default EditCard;