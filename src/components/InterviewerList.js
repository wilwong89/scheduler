import React from "react";
import "./InterviewerList.scss";
import PropTypes from "prop-types";

import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer, index) => (
          <InterviewerListItem
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.value}
            setInterviewer={event => props.onChange(interviewer.id)}
            key={index}
          />
        ))}
      </ul>
    </section>
  );
}
