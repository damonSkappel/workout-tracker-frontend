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
  const [showForm, setShowForm] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  //const [newExerciseSets, setNewExerciseSets] = useState("");  sets are defaulted to 3 for now, but this will be used later.

  const handleBack = () => {
    navigate("/");
  };
  useEffect(() => {
    console.log("useEffect running!");

    axios
      .get(`http://localhost:3000/api/templates/${id}/exercises`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        setExercises(response.data);
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  }, [id]);

  const handleStartWorkout = async () => {
    try {
      console.log("Startign workout for templade:", id);

      const response = await axios.post(
        `http://localhost:3000/api/sessions`,
        {
          template_id: id,
          date: new Date().toISOString().split("T")[0], //today's date in YYYY-MM-DD format
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const newSession = response.data;
      console.log("Created session:", newSession);

      navigate(`/workout/${newSession.id}`);
    } catch (error) {
      console.error("Error starting workout:", error);
    }
  };

  const handleCreateExercise = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/templates/${id}/exercises`,
        { exercise_name: newExerciseName, order_index: exercises.length + 1 },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      const newExercise = response.data;
      setShowForm(false);
      setNewExerciseName("");
      window.location.href = `/templates/${id}/exercises`;
    } catch (error) {
      console.log("Error creating exercise: ", error);
    }
  };

  return (
    <div className="card-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h2>Exercises</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Exercise"}
      </button>

      {showForm && (
        <form onSubmit={handleCreateExercise}>
          <input
            type="text"
            placeholder="Exercise Name"
            value={newExerciseName}
            onChange={(e) => setNewExerciseName(e.target.value)}
          />
          <button type="submit"> Create Exercise</button>
        </form>
      )}

      {exercises &&
        exercises.map((exercise) => (
          <div key={exercise.id} className="template-card">
            <h3>{exercise.exercise_name}</h3>
            <p>Default Sets: {exercise.default_sets}</p>
          </div>
        ))}
      <button className="start-workout-button" onClick={handleStartWorkout}>
        Start Workout
      </button>
    </div>
  );
};
export default ExercisesList;
