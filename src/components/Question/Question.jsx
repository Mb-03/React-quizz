import { useEffect, useState } from "react";
import styles from "./Question.module.css";

const Question = ({ quizStarted, seconds, difficulty, type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionindex, setCurrentQuestionindex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOption, setShuffledOptions] = useState([]);

  const shuffle = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  useEffect(() => {
    if (data.length === 0) return;
    const question = data[currentQuestionindex];
    const options = shuffle([
      question.correct_answer,
      "Option 1",
      "Option 2",
      "Option 3",
    ]);

    setShuffledOptions(options);
    setSelectedOption(null);
  }, [data, currentQuestionindex]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleAnswer = () => {
    if (selectedOption === data[currentQuestionindex].correct_answer) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionindex + 1 === data.length) {
      setShowResult(true);
    } else {
      setCurrentQuestionindex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!quizStarted) return;
    setLoading(true);

    fetch(
      `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=${type}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.results);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch");
        setLoading(false);
      });
  }, [quizStarted, difficulty, type]);

  if (!quizStarted) return null;
  if (loading) return <div>Loading ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {showResult ? (
        <div>
          <h2>Your score is {score}/10</h2>
        </div>
      ) : (
        <div className={styles.optionsContainer}>
          <div>
            <h2>{data[currentQuestionindex]?.question}</h2>
            <h3>{score} / 10</h3>
          </div>
          <ul>
            {shuffledOption.map((option) => (
              <li>
                <button
                  disabled={selectedOption !== null}
                  style={{
                    background: selectedOption === option ? "#c8e6c9" : "",
                  }}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                  {selectedOption === option && "✅"}
                </button>
              </li>
            ))}
          </ul>

          <button
            className={styles.next}
            onClick={handleAnswer}
            disabled={selectedOption === null}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
