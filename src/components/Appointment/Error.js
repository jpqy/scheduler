import React from 'react';

/**
 * The Error component is displayed in the appointment container to notify
 * the user of a failed request when saving or deleting an interview.
 * 
 * @param {Object}   props
 * @param {String}   props.message The error message to be displayed
 * @param {Function} props.onClose Called when user clicks "close" button
 */
export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}