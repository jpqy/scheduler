import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

/**
 * The InterviewList component displays pictures of available interviewers
 * in a horizontal row. Selecting an interviewer reveals his/her name.
 * 
 * @param {Object}   props
 * @param {Object}   props.interviewer Contains the available interviewers
 * @param {Number}   props.value       The id of the selected interviewer
 * @param {Function} props.onChange    Handles when a new interviewer is chosen
 */
export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers && props.interviewers.map(interviewer =>
          <InterviewerListItem
            key={interviewer.id}
            setInterviewer={() => props.onChange(interviewer.id)}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={props.value === interviewer.id}
          />
        )}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};