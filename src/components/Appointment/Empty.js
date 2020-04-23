import React from 'react';

/**
 * The Empty component is shown when an appointment slot is empty and is
 * bookable. It displays a large button to add a new interview.
 * 
 * @param {Object}   props           
 * @param {Function} props.onAdd Called when user clicks the "add" button
 */
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}