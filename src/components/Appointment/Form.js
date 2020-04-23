import React, { useState } from 'react';
import Button from "../Button";
import InterviewerList from "../InterviewerList";

/**
 * The Form component allows users to type in their name, select an interviewer
 * from the InterviewerList component and save the interview.
 * 
 * @param {Object}   props
 * @param {String}   props.name         Student name (passed if editing)
 * @param {Number}   props.interviewer  Interviewer ID (passed if editing)
 * @param {Object[]} props.interviewers Array of objects representing the
 *                                      interviewers available on the current
 *                                      day, passed to InterviewerListItem
 * @param {Function} props.onSave       Called when "save" is clicked
 * @param {Function} props.onCancel     Called when "cancel" is clicked
 */
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("Must select an interviewer");
      return;
    }

    props.onSave(name, interviewer);
    setError(null);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}