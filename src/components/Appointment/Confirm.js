import React from 'react';
import Button from "../Button";

/**
 * The Confirm component displays a message in the Appointment container
 * asking the user to confirm the dangerous action of deleting an appointment.
 * 
 * @param {Object}   props
 * @param {String}   props.message   The message to be displayed
 * @param {Function} props.onCancel  Called when user clicks "close" button
 * @param {Function} props.onConfirm Called when user clicks "confirm" button
 */
export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}