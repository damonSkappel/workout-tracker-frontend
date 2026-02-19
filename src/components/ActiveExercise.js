import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ActiveExercise.css";

const ActiveExercise = () => {
  return (
    <div className="active-exercise-container">
      <h2 className="exercise-header">Bench Press</h2>

      <div className="exercise-image-placeholder">
        <span>Exercise Demo</span>
      </div>

      <div className="number-of-sets">Set 1 of 4</div>

      <div className="input-section">
        <div className="input-group">
          <label>Weight</label>
          <input type="number" className="workout-input" placeholder="--" />
        </div>
        <div className="input-group">
          <label>Reps</label>
          <input type="number" className="workout-input" placeholder="--" />
        </div>
      </div>

      <button className="complete-set-button">Complete Set</button>
    </div>
  );
};

export default ActiveExercise;
