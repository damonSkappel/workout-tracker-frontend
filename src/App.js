import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkoutTemplates from "./components/TemplateList";
import ExercisesList from "./components/ExercisesList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkoutTemplates />} />
        <Route path="/templates/:id/exercises" element={<ExercisesList />} />
      </Routes>
    </Router>
  );
}

export default App;
