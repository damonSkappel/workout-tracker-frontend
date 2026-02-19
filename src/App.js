import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkoutTemplates from "./components/TemplateList";
import ExercisesList from "./components/ExercisesList";
import ActiveExercise from "./components/ActiveExercise";
import WorkoutComplete from "./components/WorkoutComplete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkoutTemplates />} />
        <Route path="/templates/:id/exercises" element={<ExercisesList />} />
        <Route path="/workout/:sessionId" element={<ActiveExercise />} />
        <Route path="/workout-complete" element={<WorkoutComplete />} />
      </Routes>
    </Router>
  );
}

export default App;
