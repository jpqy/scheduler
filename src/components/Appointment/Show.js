import React from 'react';

/**
 * The Show component is displayed when an Appointment component has an
 * interview object (i.e. is booked). It displays the student name, interviewer
 * name, and buttons to edit and delete the interview.
 * 
 * @param {Object}   props
 * @param {String}   props.student     Student name of the booking
 * @param {Object}   props.interviewer Interviewer of the booking
 * @param {Function} props.onDelete    Called when "delete" is clicked
 * @param {Function} props.onEdit      Called when "edit" is clicked
 */
export default function Show(props) {
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={() => props.onDelete(props.id)}
          />
        </section>
      </section>
    </main>
  );
}