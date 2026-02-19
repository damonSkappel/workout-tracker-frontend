import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ActiveExercise.css";
import { useParams, useNavigate } from "react-router-dom";

const ActiveExercise = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  const [weightInput, setWeightInput] = useState("");
  const [repsInput, setRepsInput] = useState("");
  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log("Fetching Session: ", sessionId);
        const response = await axios.get(
          `http://localhost:3000/api/sessions/${sessionId}`,
        );
        console.log("Session data:", response.data);
        setSessionData(response.data);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };
    fetchSession();
  }, [sessionId]);

  const handleCompleteSet = async () => {
    try {
      const currentSet = currentSets[currentSetIndex];
      console.log("Completing set:", currentSet.id);
      console.log("Weight: ", weightInput, "Reps: ", repsInput);

      //Update teh set in database
      await axios.put(`http://localhost:3000/api/sets/${currentSet.id}`, {
        weight: weightInput,
        reps: repsInput,
        completed: true,
      });

      //clear inputs
      setWeightInput("");
      setRepsInput("");
      //TODO: progress to the next set/exercise
      if (currentSetIndex < totalSets - 1) {
        setCurrentSetIndex(currentSetIndex + 1);
      } else if (currentExerciseIndex < sessionData.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSetIndex(0);
      } else {
        console.log("Workout Complete!");

        try {
          console.log("Marking Session as complete: ");
          await axios.put(
            `http://localhost:3000/api/sessions/${sessionId}/complete`,
          );
          console.log("Session marked as complete");
        } catch (error) {
          console.error("Error marking session as complete:", error);
        }

        //navigate to workout summary page
        navigate("/workout-complete");
      }
      console.log("Set Complete");
    } catch (error) {
      console.log("Error completeing set:", error);
    }
  };

  if (!sessionData) {
    return <div>Loading workout...</div>;
  }

  const currentExercise = sessionData.exercises[currentExerciseIndex];
  const currentSetNumber = currentSetIndex + 1;
  const totalSets = currentExercise.default_sets;

  const currentSets = sessionData.sets.filter(
    (set) => set.template_exercise_id === currentExercise.id,
  );

  return (
    <div className="active-exercise-container">
      <h2 className="exercise-header">{currentExercise.exercise_name}</h2>

      <div className="exercise-image-placeholder">
        <span>Exercise Demo</span>
      </div>

      <div className="number-of-sets">
        Set {currentSetNumber} of {totalSets}
      </div>

      <div className="input-section">
        <div className="input-group">
          <label>Weight</label>
          <input
            type="number"
            className="workout-input"
            placeholder="--"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Reps</label>
          <input
            type="number"
            className="workout-input"
            placeholder="--"
            value={repsInput}
            onChange={(e) => setRepsInput(e.target.value)}
          />
        </div>
      </div>

      <button className="complete-set-button" onClick={handleCompleteSet}>
        Complete Set
      </button>
    </div>
  );
};

export default ActiveExercise;
