import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorkoutComplete.css";

const WorkoutComplete = () => {
  const navigate = useNavigate();

  const handleBackToTemplates = () => {
    navigate("/");
  };

  return (
    <div className="workout-complete-container">
      <div className="completion-card">
        <h1>Workout Complete!</h1>
        <p> Great job ! you finished your workout for today.</p>

        <div className="workout-status">
          <div className="stat">
            <h3>5</h3>
            <p>Exercises</p>
          </div>
          <div className="stat">
            <h3>15</h3>
            <p>Sets Completed</p>
          </div>
        </div>
        <button
          className="back-to-templates-button"
          onClick={handleBackToTemplates}
        >
          Back to Templates
        </button>
      </div>
    </div>
  );
};

export default WorkoutComplete;
