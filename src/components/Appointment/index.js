import "./styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => transition(CREATE);
  const onEdit = () => transition(EDIT);
  const onCancel = () => back();

  function askDelete() {
    transition(CONFIRM);
  }

  function deleteInterview() {
    transition(DELETE);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => {
        transition(ERROR_DELETE, true);
      });
  }

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={onEdit}
          onDelete={askDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          name=""
          onCancel={onCancel}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={
            props.interview.interviewer ? props.interview.interviewer.id : ""
          }
          onCancel={onCancel}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === ERROR_SAVE && (
        <Error message={"Unable to save"} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Unable to delete"} onClose={back} />
      )}
      {mode === DELETE && <Status message={DELETE} />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
    </article>
  );
}
