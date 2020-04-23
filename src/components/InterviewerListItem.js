import React from "react";
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

/**
 * The InterviewListItem component represents a single interviewer that make
 * up the InterviewerList component.
 * 
 * @param {Object}   props
 * @param {String}   props.name           Interviewer name
 * @param {String}   props.avatar         Url of interviewer photo
 * @param {Boolean}  props.selected       Whether interviewer is selected
 * @param {Function} props.setInterviewer Handles the clicking of interviewers
 */
export default function InterviewerListItem(props) {
  const listItemClass = classNames(
    "interviewers__item",
    { "interviewers__item--selected": props.selected }
  );

  return (
    <li
      className={listItemClass}
      selected={props.selected}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}