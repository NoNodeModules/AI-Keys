import React, { useState } from "react";

import './Letter.css';

function Letter(props) {

    // {index < keyIndex ? items[index] : ""}
    const isCurrent = props.id === props.currIndex
    const isPrev = props.id < props.currIndex
    const extraClassName = isCurrent ?  "letter-blink" : isPrev  ? (props.isCorrect ?  'letter-correct' : 'letter-notcorrect' ) : ""

    return (
        <span 
        id = {props.id}
        className={`letter ${extraClassName}`}>{props.text}
        </span>
      );
  }

  export default Letter;