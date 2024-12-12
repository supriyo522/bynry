import React, { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import "./styles.css";

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch profiles from mock data
  useEffect(() => {
    setLoading(true);
    fetch("/mock-data/profiles.json")
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        setLoading(false);
      });
  }, []);

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
    initMap(profile.location.lat, profile.location.lng);
  };

  const initMap = (lat, lng) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCK9eGOwlkmMjwVnG4AJPwNgll5qfFEC2o&callback=initMapCallback`;
    script.async = true;
    script.defer = true;
    window.initMapCallback = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 12,
      });
      new google.maps.Marker({
        position: { lat, lng },
        map,
      });
    };
    document.body.appendChild(script);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Profile Explorer</h1>
      </header>

      <div className="content">
        <div className="profile-list">
          {loading ? (
            <p>Loading profiles...</p>
          ) : (
            profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSummaryClick={handleSummaryClick}
              />
            ))
          )}
        </div>

        {selectedProfile && <div id="map" className="map-container"></div>}
      </div>
    </div>
  );
};

export default App;
