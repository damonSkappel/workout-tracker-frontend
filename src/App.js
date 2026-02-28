import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkoutTemplates from "./components/TemplateList";
import ExercisesList from "./components/ExercisesList";
import ActiveExercise from "./components/ActiveExercise";
import WorkoutComplete from "./components/WorkoutComplete";
import Auth from "./components/Auth";

function ProtectedRoute({ element }) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return null;
  }
  return element;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute element={<WorkoutTemplates />} />}
        />
        <Route
          path="/templates/:id/exercises"
          element={<ProtectedRoute element={<ExercisesList />} />}
        />
        <Route
          path="/workout/:sessionId"
          element={<ProtectedRoute element={<ActiveExercise />} />}
        />
        <Route
          path="/workout-complete"
          element={<ProtectedRoute element={<WorkoutComplete />} />}
        />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
