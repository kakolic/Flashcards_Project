import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import EditCard from "./EditCard";


function Deck({card} ) {
    const {deckId} = useParams();
    const history = useHistory();

    const [currentDeck, setCurrentDeck] = useState(null)
    const [currentCards, setCurrentCards] = useState(null);

    
    useEffect(() => {
        async function loadDeck() {
            setCurrentDeck([]);
            setCurrentCards([]);
            try {
                const response = await readDeck(deckId);
                setCurrentDeck(response);
                const { cards } = response;
                setCurrentCards(cards);
            } catch (error) {console.log(error)}
        }
        loadDeck()
    }, [deckId])
    
    const handleDelete = async (deck) => {
        deck.preventDefault();

        if(window.confirm(" Would you like to delete this deck?")){
            deleteDeck(`${deck.id}`);
            history.go("/")}
    }


    const handleCard = async()=> {
        if(EditCard(currentDeck.id))
            history.push(`/decks/${currentDeck.id}/cards/${card.id}/edit`);
        }
    const handleStudyCard = (e) => {
        e.preventDefault();
            history.push(`/decks/${currentDeck.id}/study`);
            }
    const handleAddCard = (e) => {
        e.preventDefault();
              history.push(`/decks/${currentDeck.id}/cards/new`);
                }

    
    if (currentDeck && currentCards) {
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / {currentDeck.name}
                </div>
                <div>
                    <h2>{currentDeck.name}</h2>
                    <p>{currentDeck.description}</p>
                    <button onClick={handleCard}>Edit</button>
                    <button onClick={handleStudyCard}>Study</button>
                    <button onClick={handleAddCard}>Add Cards</button>
                    <button onClick={handleDelete}>
                    Delete
                    </button>
                </div>
                <div>
                    <h3>Cards</h3>
                    <ul>
                        {currentCards.map((card) => (
                            <li key={card.id}>
                                {card.front}
                                <div>{card.back}</div>
                                <button onClick={handleCard}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };
    return (
        <p>Loading...</p>
    );
};

export default Deck;