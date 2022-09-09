import React, { useState } from 'react';  

import Wrapper from './components/Wrapper/Wrapper';
import Screen from './components/Screen/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button/Button';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2 ,3, "+"],
  [0, ".", "="],
]


const toLocaleString = (num) =>
String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


function App() {

  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    result: 0, 
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num: 
          calc.num === 0 && value === "0"
          ? "0"
          : removeSpaces(calc.num) % 1 === 0 
          ? toLocaleString(Number(removeSpaces(calc.num + value)))
          : toLocaleString(calc.num + value),
        result: !calc.sign ? 0 : calc.result,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    })
  }

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    
    setCalc({
      ...calc,
      num: 0,
      sign: value,
      result: !calc.result && calc.num ? calc.num : calc.result,
    });
  };

  const equalsClickHandler = () => {
    if (calc.num && calc.sign) {
      const math = (a, b, sign) => 
        sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "x"
        ? a * b
        : a / b;

        setCalc({
          ...calc,
          result:
            calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
              math(
                Number(removeSpaces(calc.result)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
          num: 0,
          sign: "",
      });
    } 
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      result: calc.result ? toLocaleString(removeSpaces(calc.result) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let result = calc.result ? parseFloat(removeSpaces(calc.result)) : 0;

    setCalc({
      ...calc,
      sign: "",
      num: (num /= Math.pow(100, 1)),
      result: (result /= Math.pow(100, 1)),
    });
  };


  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      result: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.result}/>
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button 
              key={i}
              className = {
                btn === "=" 
                ? "equals" 
                : btn === "+" 
                ? "calculationSign" 
                : btn === "-"
                ? "calculationSign"
                : btn === "x"
                ? "calculationSign"
                : btn === "/"
                ? "calculationSign"
                : btn === "C"
                ? "featureSign"
                : btn === "+-"
                ? "featureSign"
                : btn === "%"
                ? "featureSign"
                : ""
              }
              value = {btn}
              onClick = {
                btn === "C"
                ? resetClickHandler
                : btn === "+-"
                ? invertClickHandler
                : btn === "%"
                ? percentClickHandler
                : btn === "="
                ? equalsClickHandler
                : btn === "/" || btn === "x" || btn === "-" || btn === "+" 
                ? signClickHandler
                : btn === "."
                ? commaClickHandler
                : numClickHandler 
              }
            />
          );
        })}  
        
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
