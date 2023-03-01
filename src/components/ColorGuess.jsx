import React, { useEffect, useState } from "react";

function ColorGuess() {
  const [color, setColor] = useState();
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF"; //all the possible characters we can use to generate a hex code
    let color = "#";
    for (let i = 0; i < 6; i++) {
      //a loop that runs 6 times, each time genrating 1 character of the hex code
      color += letters[Math.floor(Math.random() * 16)]; //random index from 0 -> 15
    }
    return color;
  };

  const getRandomAnswers = (correctColor) => {
    const wrongColor1 = getRandomColor();
    const wrongColor2 = getRandomColor();

    //make sure there are 3 unique answers
    while (
      wrongColor1 === correctColor ||
      wrongColor2 === correctColor ||
      wrongColor1 === wrongColor2
    ) {
      wrongColor1 = getRandomColor();
      wrongColor2 = getRandomColor();
    }

    return [wrongColor1, wrongColor2];
  };

  const handleRefresh = () => {
    const newColor = getRandomColor();
    const newAnswers = getRandomAnswers(newColor).concat(newColor);

    newAnswers.sort(() => Math.random() - 0.5); //shuffle and by using the range from -0.5 to 0.5, we ensure that any pair of elements has an equal chance of being compared as greater or lesser, leading to a random order.

    setAnswers(newAnswers);
    setColor(newColor);
    setIsCorrect(null);
    setSelectedOption(null);
  };

  const handleAnswers = (clickedAnswer) => {
    setSelectedOption(clickedAnswer);

    if (clickedAnswer === color) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setAnswers([]);
    setColor(null);
    setIsCorrect(null);
    setSelectedOption(null);
  };

  return (
    <div className="h-1/2 w-3/4 md:max-w-lg p-5 rounded-lg  text-center">
      <div>
        <button
          onClick={handleRefresh}
          className="text-white text-sm bg-green-500 rounded-lg transition duration-300 hover:-translate-y-1 mb-[40px] mr-10 w-[60px] p-2"
        >
          New
        </button>
        <button
          disabled={answers.length === 0}
          onClick={handleReset}
          className="text-white w-[60px] text-center text-sm bg-green-500 rounded-lg transition duration-300 hover:-translate-y-1 mb-[40px] p-2 disabled:opacity-75"
        >
          Reset
        </button>
      </div>

      {color && (
        <>
          <div
            className="w-40 h-40 border-2 border-white mx-auto mb-[40px]"
            style={{
              background: color,
            }}
          ></div>

          <div className="w-3/4 text-center mx-auto flex justify-around p-4">
            {answers.map((answer, i) => (
              <div
                onClick={() => handleAnswers(answer)}
                key={i}
                className="text-white bg-blue-500 p-1 rounded-lg text-sm transition duration-300 hover:-translate-y-1"
              >
                {answer}
              </div>
            ))}
          </div>
        </>
      )}

      {selectedOption && (
        <p
          className={
            isCorrect
              ? `font-bold text-3xl text-green-500`
              : `font-bold text-3xl text-red-500`
          }
        >
          {isCorrect ? "Correct!" : "Incorrect :( Please Try Again"}
        </p>
      )}
    </div>
  );
}

export default ColorGuess;
