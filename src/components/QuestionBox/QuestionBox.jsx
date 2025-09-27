import { useEffect, useState } from "react";
import styles from "./QuestionBox.module.css";
import Question from "../Question/Question";
const QuestionBox = () => {
  const [quizStarted, SetQuizStarted] = useState(false);
  const [seconds, setSeconds] = useState(120);
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    let interval = null;
    if (quizStarted && seconds) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 || !quizStarted) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [quizStarted, seconds]);

  const startQuiz = () => {
    setSeconds(120);
    SetQuizStarted(true);
  };

  const resetQuiz = () => {
    setSeconds(120);
    SetQuizStarted(false);
  };

  const handleDifficulty = (level) => {
    setDifficulty(level);
  };

  const handleType = (type) => {
    setType(type);
  };

  return (
    <div className={styles.quizContainerMain}>
      <div className={styles.quizContainer}>
        <h2>React Quiz</h2>
        <h3>Time Left: {seconds}</h3>
      </div>
      <div>
        {seconds ? (
          <ul>
            <li>
              <Question
                quizStarted={quizStarted}
                seconds={seconds}
                difficulty={difficulty}
                type={type}
              />
            </li>
          </ul>
        ) : (
          <h2>Your Time Has Run Out</h2>
        )}
      </div>

      <div className={styles.startBtn}>
        {quizStarted ? (
          <button onClick={resetQuiz}>Reset Quiz</button>
        ) : (
          <button onClick={startQuiz}>Start Quiz</button>
        )}
      </div>
      <div>
        <h3>Please Choose the difficulty:</h3>
        <div className={styles.difficultyContainer}>
          <button
            disabled={difficulty !== "" && difficulty !== "easy"}
            onClick={() => handleDifficulty("easy")}
          >
            Easy
          </button>
          <button
            disabled={difficulty !== "" && difficulty !== "medium"}
            onClick={() => handleDifficulty("medium")}
          >
            Medium
          </button>
          <button
            disabled={difficulty !== "" && difficulty !== "hard"}
            onClick={() => handleDifficulty("hard")}
          >
            Hard
          </button>
        </div>
        <div>
          <h2>Please Choose the type:</h2>
          <div className={styles.typeContainer}>
            <button
              disabled={type !== "" && type !== "multiple"}
              onClick={() => handleType("multiple")}
            >
              Multiple Choice
            </button>
            <button
              disabled={type !== "" && type !== "boolean"}
              onClick={() => handleType("boolean")}
            >
              True / False
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
