"use client";

import { useState } from "react";

export default function NewChannel() {
  const [inputData, setInputData] = useState({
    type: "",
    name: "",
    url: "",
    description: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/channel`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputData.name,
        description: inputData.description,
        type: inputData.type,
        url: inputData.url,
      }),
    });

    if (!res.ok) {
      setLoading(false);
      throw new Error("Something went wrong while adding your data.");
    } else {
      setLoading(false);
      setFormSubmitted(true);
    }
  };

  const updateField = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const resetForm = (e) => {
    e.preventDefault();
    setInputData({ name: "", type: "", description: "", url: "" });
    setLoading(false);
    setFormSubmitted(false);
  };

  return (
    <div className="Dashboard bordered">
      <form onSubmit={(e) => submitForm(e)} className="form  p-md">
        {formSubmitted == true ? (
          <>
            <h2>Channel Added!</h2>
            <button
              onClick={(e) => resetForm(e)}
              className="button button--primary"
            >
              Add More
            </button>
          </>
        ) : loading == true ? (
          <span>Loading...</span>
        ) : (
          <>
            <div className="input-container">
              <label>
                Platform:
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={inputData.type}
                  onChange={(e) => {
                    updateField(e);
                  }}
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Channel Name:
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={inputData.name}
                  onChange={(e) => {
                    updateField(e);
                  }}
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                URL:
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={inputData.url}
                  onChange={(e) => {
                    updateField(e);
                  }}
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Description:
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={inputData.description}
                  onChange={(e) => {
                    updateField(e);
                  }}
                />
              </label>
            </div>
            <button className="button button--secondary">Submit</button>
          </>
        )}
      </form>
    </div>
  );
}
