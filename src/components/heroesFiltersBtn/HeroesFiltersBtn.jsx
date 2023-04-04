import classNames from "classnames";
import React from "react";
import { useState } from "react";

const HeroesFiltersBtn = ({ nameBtn, label, setFilter }) => {
  const [active, setActive] = useState(false);
  let classElement = "";
  switch (nameBtn) {
    case "all":
      classElement = "btn btn-outline-dark";
      break;
    case "fire":
      classElement = "btn btn-danger";
      break;
    case "water":
      classElement = "btn btn-primary";
      break;
    case "wind":
      classElement = "btn btn-success";
      break;
    case "earth":
      classElement = "btn btn-secondary";
      break;
    default:
      classElement = "btn";
      break;
  }
  const setFiltersActive = () => {
    setActive((state) => !state);
    setFilter();
  };
  const clazz = classNames(classElement, { active });

  return (
    <button onClick={setFiltersActive} className={clazz}>
      {label}
    </button>
  );
};

export default HeroesFiltersBtn;
