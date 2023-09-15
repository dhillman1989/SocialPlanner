"use client";

import { useEffect, useState } from "react";
import moment from "moment";

export default function NewChannel() {
  const [inputData, setInputData] = useState({
    name: "",
    channel_id: "",
    description: "",
    campaign_id: "",
    datetime: "",
    datetimeConverted: null,
    newCampaignName: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [channelOptions, setChannelOptions] = useState([]);
  const [campaignOptions, setCampaignOptions] = useState([]);
  const [error, setError] = useState({ errorFound: false, message: "" });

  /// GRAB CAMPAIGN DATA
  useEffect(() => {
    fetch("http://localhost:3000/api/campaign").then((res) =>
      res.json().then((res) => {
        setCampaignOptions(res);
      })
    );
  }, []);

  //// GRAB CHANNEL DATA
  useEffect(() => {
    fetch("http://localhost:3000/api/channel").then((res) =>
      res.json().then((res) => {
        setChannelOptions(res);
      })
    );
  }, []);

  ///OTHER FORM LOGIC
  const submitForm = (e) => {
    e.preventDefault();
    if (
      inputData.name == "" ||
      inputData.channel_id == "" ||
      inputData.campaign_id == "" ||
      inputData.datetime == "" ||
      inputData.description == ""
    ) {
      setError({ errorFound: true, message: "Please fill in all fields." });
      return;
    }
    

    setFormSending(true);

    let campaign_id = inputData.campaign_id;
    if (campaign_id == "addnew") {
      fetch("http://localhost:3000/api/campaign", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: inputData.newCampaignName,
        }),
      })
        .then((res) => res.json().then((res) => (campaign_id = res.id)))
        .then((res) => {
          fetch("http://localhost:3000/api/event", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name: inputData.name,
              description: inputData.description,
              campaign_id: campaign_id,
              channel_id: inputData.channel_id,
              datetime: inputData.datetimeConverted,
            }),
          })
            .then(() => {
              setFormSending(false);
              setFormSubmitted(true);
            })
            .catch(() => {
              setFormSending(false);
              throw new Error("Something went wrong while adding your data.");
            });
        });
    } else {
      fetch("http://localhost:3000/api/event", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: inputData.name,
          channel_id: inputData.channel_id,
          description: inputData.description,
          campaign_id: inputData.campaign_id,

          datetime: inputData.datetimeConverted,
        }),
      })
        .then(() => {
          setFormSending(false);
          setFormSubmitted(true);
        })
        .catch(() => {
          setFormSending(false);
          throw new Error("Something went wrong while adding your data.");
        });
    }
  };

  const updateField = (e) => {
    if(e.target.name == "datetime"){
      e.target.valueAsDate = new Date(e.target.value);
      setInputData({ ...inputData, [e.target.name]: e.target.value, datetimeConverted: e.target.valueAsDate });
    }else{
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
    
  };

  const resetForm = (e) => {
    e.preventDefault();
    setInputData({
      id: "",
      name: "",
      channel_id: "",
      description: "",
      campaign_id: "",
      datetime: "",
    });
    setFormSending(false);
    setFormSubmitted(false);
  };

  return (
    <div className="Dashboard bordered">
      <form onSubmit={(e) => submitForm(e)} className="form p-4">
        {formSubmitted == true ? (
          <>
            <h2>Event Added!</h2>
            <button
              onClick={(e) => resetForm(e)}
              className="button button--primary"
            >
              Add More
            </button>
          </>
        ) : formSending == true ? (
          <span>Submitting...</span>
        ) : (
          <>
            <div className="input-container">
              <label>
                Platform:
                <select
                  className="rounded bordered py-2 px-3"
                  value={inputData.channel_id}
                  name="channel_id"
                  onChange={(e) => updateField(e)}
                >
                  {!channelOptions || channelOptions.length < 1 ? (
                    <option disabled value="default">
                      Fetching Channels...
                    </option>
                  ) : (
                    <>
                      <option selected>Select a Channel</option>
                      {channelOptions.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.type.toUpperCase()} - {option.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </label>
              <label>
                Campaign:
                <select
                  className="rounded bordered py-2 px-3"
                  value={inputData.campaign_id}
                  name="campaign_id"
                  onChange={(e) => updateField(e)}
                >
                  {!campaignOptions || campaignOptions.length < 1 ? (
                    <option disabled value="default">
                      Fetching Campaigns...
                    </option>
                  ) : (
                    <>
                      <option selected>Select a Campaign</option>
                      {campaignOptions.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </>
                  )}
                  <option value="addnew">ADD NEW +</option>
                </select>
                {!!(inputData.campaign_id == "addnew") && (
                  <input
                    className="rounded bordered py-2 px-3"
                    id="newCamapaignName"
                    name="newCampaignName"
                    placeholder="New Campaign Name"
                    onChange={(e) => {
                      updateField(e);
                    }}
                  />
                )}
              </label>
            </div>
            <div className="input-container">
              <label>
                Name:
                <input
                  className="rounded bordered py-2 px-3"
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
                Description:
                <input
                  className="rounded bordered py-2 px-3"
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
            <div className="input-container">
              <label>
                Date / Time:
                <input
                  className="rounded bordered py-2 px-3"
                  type="date"
                  id="datetime"
                  name="datetime"
                  value={inputData.datetime}
                  onChange={(e) => {
                    updateField(e);
                  }}
                />
              </label>
            </div>

            <button className="button button--secondary">Submit</button>
            {!error.errorFound ? null : (
              <span className="text-orange-900">{error.message}</span>
            )}
          </>
        )}
      </form>
    </div>
  );
}
