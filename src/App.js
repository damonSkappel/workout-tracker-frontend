import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkoutTemplates from "./components/TemplateList";
import ExercisesList from "./components/ExercisesList";
import ActiveExercise from "./components/ActiveExercise";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkoutTemplates />} />
        <Route path="/templates/:id/exercises" element={<ExercisesList />} />
        <Route path="/workout/:sessionId" element={<ActiveExercise />} />
      </Routes>
    </Router>
  );
}

export default App;
