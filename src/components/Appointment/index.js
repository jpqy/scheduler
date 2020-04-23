import React, { useEffect } from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


/**
 * The Appointment component is a container that represents a timeslot on 
 * the day's schedule. It always displays a Header component that separates
 * each Appointment horizontally, and also displays one of Show, Empty, Form,
 * Status, Confirm, and Error components in its main area depending on the
 * the context specified in the useVisualMode custom hook.
 * 
 * @param {Object}   props
 * @param {Number}   props.id
 * @param {String}   props.time         Time to be displayed, passed to Header
 * @param {Object}   props.interview    The interview object (null if slot is
 *                                      unbooked), passed to Form
 * @param {Object[]} props.interviewers Array of objects representing the
 *                                      interviewers available on the current
 *                                      day, passed to Form > InterviewerList
 * @param {Function} props.bookInterview   Makes API request to (re-)assign an
 *                                         interview object to the Appointment
 * @param {Function} props.cancelInterview Makes API request to set interview
 *                                         object to null
 */
export default function Appointment(props) {

  const { mode, transition, back } =
    useVisualMode(props.interview ? SHOW : EMPTY);

  // Handles when Form's save button is clicked
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  // Handles when Show's delete button is clicked
  function deleteFromAppointment(id) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  // Prevent visual mode stale state due to WebSocket updating interview data
  useEffect(() => {
    if (props.interview && mode === EMPTY) transition(SHOW);
    if (!props.interview && mode === SHOW) transition(EMPTY);
  }, [props.interview, transition, mode]);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {/* Uses visual mode to show the appropriate component */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRMING)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === SAVING && (<Status message={"Saving"} />)}

      {mode === DELETING && (<Status message={"Deleting"} />)}

      {mode === ERROR_SAVE && (
        <Error
          message={"Could not save the appointment!"}
          onClose={() => back()}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error message={"Could not delete the appointment!"}
          onClose={() => back()}
        />
      )}

      {mode === CONFIRMING && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={deleteFromAppointment}
        />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  );
}