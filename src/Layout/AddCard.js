
import React from "react";
import { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

//allows the user to create a new Card

function AddCard() {
 
    const { deckId } = useParams();
   
    const initializeForm = {
      front: "",
      back: "",
      deckId,
    };
    const [card, setCard] = useState({ ...initializeForm });
    const [deck, setDeck] = useState({});
  
   
    useEffect(() => {
      async function loadDeck() {
        
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      }
      loadDeck();
    }, [deckId]);
  
  
    function changeFront(e) {
      setCard({ ...card, front: e.target.value });
    }
    function changeBack(e) {
      setCard({ ...card, back: e.target.value });
    }
  
    function submitHandler(e) {
      e.preventDefault();
      async function updateData() {
        await createCard(deckId, card);
        setCard({ ...initializeForm });
      }
      updateData();
    }
  
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
        <h4>{deck.name}: Add Card</h4>
        <CardForm
          submitHandler={submitHandler}
          card={card}
          changeFront={changeFront}
          changeBack={changeBack}
        />
      </div>
    );
  }
  
export default AddCard;