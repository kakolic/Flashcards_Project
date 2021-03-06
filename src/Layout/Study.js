import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";


function Study() {
    const {deckId} = useParams();
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

    
    if(currentDeck){
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Study
                </div>
                <div>
                    <h1>{currentDeck.name}: Study</h1>
                </div>
                    <StudyCard currentCards={currentCards} />
            </div>
        )
    
    }
    return (
        <p>Loading...</p>
    );
}
export default Study;