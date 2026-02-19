import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./TemplateList.css";

const WorkoutTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    console.log("useEffect running!");

    axios
      .get("http://localhost:3000/api/templates")
      .then((response) => {
        console.log("API response:", response.data);
        setTemplates(response.data);
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  }, []);

  return (
    <div className="card-container">
      <h2> Workout Templates</h2>

      {templates &&
        templates.map((template) => (
          <div key={template.id} className="template-card">
            <h3>{template.name}</h3>
            <p>{"Last Session: " + template.created_at}</p>
          </div>
        ))}
    </div>
  );
};
export default WorkoutTemplates;
