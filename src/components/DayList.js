import React from "react";

import DayListItem from "components/DayListItem";

//import "./styles.css";

export default function DayList(props) {
  const { days, day, setDay } = props;

  return (
    <ul>
      {days.map((d, id) => (
        <DayListItem
          name={d.name}
          spots={d.spots}
          selected={d.name === day}
          setDay={event => setDay(d.name)}
          key={id}
        />
      ))}
    </ul>
  );
}
