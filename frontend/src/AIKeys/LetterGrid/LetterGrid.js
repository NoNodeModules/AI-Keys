import React, { useState } from "react";
import Letter from "../Letter/Letter.js"
import './LetterGrid.css';

function LetterGrid(props) {

    const textExists = props.getMessage !== undefined && props.getMessage.status === 200
    const currKey = props.keyIndex

    return (
        <div> {
            textExists?  
            <div className="center grid"> {
              Array.from(props.getMessage.data.message).map((char, index) => {
                const entry = index < currKey ? props.items[index] : ""
                const isCorrect = entry === char
                return (
                  <Letter
                  key = {index}
                  id = {index}
                  text = {char}
                  isCorrect = {isCorrect}
                  entry = {entry}
                  currIndex = {currKey}
                  ></Letter>
                )
              })
            }</div>
            :
            <div className="loading center"><h1>Loading</h1></div>
            }  
        </div> 
    )

}

 <div className="loading center"><h1>Loading</h1></div>
export default LetterGrid;