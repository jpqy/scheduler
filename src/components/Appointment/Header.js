import React from 'react';

/**
 * The Header consists of an hr element that separates the appointment slots
 * horizontally and displays the time on the left side.
 * 
 * @param {Object} props
 * @param {String} props.time Time to be displayed
 */
export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}