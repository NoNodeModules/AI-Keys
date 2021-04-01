import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Dropdown from "./AIKeys/Dropdown/Dropdown.js"
import LetterGrid from "./AIKeys/LetterGrid/LetterGrid.js"

function App() {
  const [texts, setTexts]  = useState([]);
  const [keyIndex, setKeyIndex] = useState(0)
  const [keys, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [lang, setLang] = useState("python");
  const [time, setTimer] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [langDidChange, setLangState] = useState(false);

  useEffect(()=>{ 
    if (langDidChange) {
      setTexts([])
    }
      fetchText(lang)
      fetchText(lang)
      resetState()
  }, [lang, langDidChange])

  useEffect(()=>{ 
    setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);  
  }, [])

  useEffect(()=>{ 
    const speed_now = Math.round(score/(time/60));
    setSpeed(speed_now === Infinity ? 0 : speed_now);
  }, [time, score])


  useEffect(() => {
    function downHandler({ key }) {
      if (texts.length > 0 && texts[0].status === 200 && texts[0].data.message.length === keyIndex - 1) {
        setTexts(texts.splice(1,texts.length))
        fetchText(lang)
        resetState()
      }
      if (keyIndex === 1) {
        setTimer(0)
      }

      if (key === ""){
        key = " "
      } else if (key ==='Shift' || key === 'Meta') {
        return;
      }
      addItem(key)
      setKeyIndex(keyIndex => keyIndex + 1);
      setScore(prevVal => prevVal + 1);
  }
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [keys, keyIndex, resetState, lang, texts, setTexts]); 

  const addItem = (key) => {
    console.log(key)
    setItems(items => [...items, key]);
  };

  const addText = (text) => {
    console.log(text.data.message)
    setTexts(texts => [...texts, text])
  }

  const fetchText = (lang) => {
    const url = `https://aikey.herokuapp.com/${lang}`
    axios.get(url).then(response => {
      console.log("SUCCESS", response)
      addText(response)
    }).catch(error => {
      console.log(error)
    })
  }

  function resetState(lang) {
      setScore(0)
      setItems([])
      setTimer(0)
      setSpeed(0)
      setKeyIndex(0)
  }

  function switchLang(lang) {
    setLang(lang)
    setLangState(true)
  }

  return (
    <div className="App">
        <Dropdown onClickButton = {(l)=>switchLang(l)}></Dropdown>
        <h2 className="wpm">CPM: {speed}</h2>
        <h2 className="wpm">Time: {keyIndex === 0 ? 0 : time}</h2>
        <LetterGrid 
          items={keys}
          getMessage={texts[0]}
          keyIndex={keyIndex}
        ></LetterGrid>
    </div>
  );
}

export default App;


