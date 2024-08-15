import React from "react";

export default function OverviewCard(props) {
  const { heading, text, icon } = props;
  return (
    <div className="stat-card">
      <div className="stat-icon hover:bg-gray-900 rounded-full transition-colors cursor-pointer">{icon}</div>
      <div className="stat-info">
        <p className="stat-title">{heading}</p>
        <p className="stat-value">{text}</p>
      </div>
    </div>
  );
}
