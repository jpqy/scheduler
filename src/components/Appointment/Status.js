import React from 'react';

/**
 * The Status component is temporarily displayed when an API request is being
 * made to save or delete an interview. It displays a message and a spinner.
 * 
 * @param {Object} props
 * @param {String} props.message The status message to display
 */
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}