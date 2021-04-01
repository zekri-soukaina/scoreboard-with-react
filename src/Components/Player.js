import React from "react";

export default function Player({ id, name, score, handleIncrementscore }) {
  return (
    <div>
      <ul class="list-group ">
        <li class="list-group-item " key={id}>
          <button onClick={handleIncrementscore}>+</button> {name}{" "}
          <span class="badge ">{score}</span>
        </li>
      </ul>
    </div>
  );
}
