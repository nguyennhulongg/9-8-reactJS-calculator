import React, { useState } from 'react';  

import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2 ,3, "+"],
  [0, ".", "="],
]


function App() {

  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    result: 0, 
  });

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.result}/>
      <ButtonBox>
      {
        btnValues.flat().map((btn, i) => {
          return (
            <Button 
              key={i}
              className = {btn === "=" ? "equals" : ""}
              value = {btn}
              onClick = {() => {
                console.log(`${btn} clicked`);
              }}
            />
          );
        })
      }  
      
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
