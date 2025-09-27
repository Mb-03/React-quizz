import styles from  "./App.module.css"
import QuestionBox from "./components/QuestionBox/QuestionBox"
const App = () => {
  return (
    <div className={styles.app}>
      <QuestionBox />
    </div>
  )
}

export default App