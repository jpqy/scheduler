import React from "react";
import 'components/DayListItem.scss';
import classNames from 'classnames';

/**
 * The DayListItem component represents a single day in the sidebar that
 * shows the name and number of free appointment spots remaining.
 * 
 * @param {Object}   props
 * @param {String}   props.name     Name of the day
 * @param {Number}   props.spots    Number of unbooked appointment slots
 * @param {Boolean}  props.selected Whether the current day is selected
 * @param {Function} props.setDay   Sets the current day in view
 */
export default function DayListItem(props) {
  const listClass = classNames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );

  // Returns a grammatically appropriate string to display remaining spots
  const formatSpots = (spots) => {
    return `
    ${spots === 0 ? "no" : spots} spot${spots === 1 ? "" : "s"} remaining
    `;
  };

  return (
    <li
      className={listClass}
      onClick={() => props.setDay(props.name)}
      data-testid="list"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}