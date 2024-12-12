import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ profile, onSummaryClick }) => (
  <div className="profile-card">
    <img src={profile.photo} alt={profile.name} className="profile-photo" />
    <h2>{profile.name}</h2>
    <p>{profile.description}</p>
    <button onClick={() => onSummaryClick(profile)}>Summary</button>
  </div>
);

export default ProfileCard;
