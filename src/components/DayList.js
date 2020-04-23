import React from "react";
import DayListItem from "./DayListItem";

/**
 * The DayList component is shown as a sidebar on the left, displaying and
 * allowing navigation to different days of the week, each of which is a 
 * DayListItem component.
 * 
 * @param {Object}   props
 * @param {Object[]} props.days   An array of day objects, each containing info
 *                                about appointments and interviewers on a 
 *                                particular day
 * @param {String}   props.day    The currently selected day
 * @param {Function} props.setDay Sets the current day in view, passed to
 *                                DayListItem
 */
export default function DayList(props) {
  return (
    <ul>
      {props.days.map((day) => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      ))}
    </ul>
  );
}
