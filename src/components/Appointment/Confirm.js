import "./styles.scss";
import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button data-testid="cancel" onClick={props.onCancel} danger>
          Cancel
        </Button>
        <Button data-testid="confirm" onClick={props.onConfirm} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}
