import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./ExercisesList.css";
import { useParams, useNavigate, Link } from "react-router-dom";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  useEffect(() => {
    console.log("useEffect running!");

    axios
      .get(`http://localhost:3000/api/templates/${id}/exercises`)
      .then((response) => {
        console.log("API response:", response.data);
        setExercises(response.data);
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  }, [id]);

  return (
    <div className="card-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h2>Exercises</h2>
      {exercises &&
        exercises.map((exercise) => (
          <div key={exercise.id} className="template-card">
            <h3>{exercise.exercise_name}</h3>
            <p>Default Sets: {exercise.default_sets}</p>
          </div>
        ))}
      <Link to="/active-exercise" className="start-workout-button">
        Start Workout
      </Link>
    </div>
  );
};
export default ExercisesList;
