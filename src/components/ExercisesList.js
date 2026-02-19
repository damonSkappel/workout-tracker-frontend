import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./ExercisesList.css";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    console.log("useEffect running!");

    axios
      .get(`http://localhost:3000/api/templates/1/exercises`)
      .then((response) => {
        console.log("API response:", response.data);
        setExercises(response.data);
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  }, []);

  return (
    <div className="card-container">
      <h2>Exercises</h2>
      {exercises &&
        exercises.map((exercise) => (
          <div key={exercise.id} className="template-card">
            <h3>{exercise.exercise_name}</h3>
            <p>Default Sets: {exercise.default_sets}</p>
          </div>
        ))}
      <button className="start-workout-button">Start Workout</button>
    </div>
  );
};
export default ExercisesList;
