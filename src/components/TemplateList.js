import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./TemplateList.css";
import { Link } from "react-router-dom";

const WorkoutTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");

  useEffect(() => {
    console.log("useEffect running!");

    axios
      .get("http://localhost:3000/api/templates", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        setTemplates(response.data);
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  }, []);

  const handleCreateTemplate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/templates",
        { name: newTemplateName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      const newTemplate = response.data;
      setShowForm(false);
      setNewTemplateName("");
      window.location.href = `/templates/${newTemplate.id}/exercises`;
    } catch (error) {
      console.log("Error creating template:", error);
    }
  };

  return (
    <div className="card-container">
      <h2> Workout Templates</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Create Template"}
      </button>

      {showForm && (
        <form onSubmit={handleCreateTemplate}>
          <input
            type="text"
            placeholder="Template Name"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      )}

      {templates &&
        templates.map((template) => (
          <Link
            to={`/templates/${template.id}/exercises`}
            key={template.id}
            className="template-card-link"
          >
            <div key={template.id} className="template-card">
              <h3>{template.name}</h3>
              <p>{"Last Session: " + template.created_at}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};
export default WorkoutTemplates;
