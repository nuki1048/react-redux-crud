/* eslint-disable array-callback-return */
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { heroesAddNew } from "../../actions";

const HeroesAddForm = () => {
  const { filters } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [element, setElement] = useState("");
  const { request } = useHttp();
  const dispatch = useDispatch();

  const addNewHero = (event) => {
    event.preventDefault();
    const hero = { name, description: power, element, id: uuidv4() };
    dispatch(heroesAddNew(hero));

    request(
      "http://localhost:3001/heroes/",
      "POST",
      JSON.stringify(hero)
    ).catch((error) => console.log(error));

    setName("");
    setPower("");
    setElement("");
  };

  // const names = (value) => {
  //   switch (value) {
  //     case "fire":
  //       return "Огонь";
  //     case "water":
  //       return "Вода";
  //     case "wind":
  //       return "Ветер";
  //     case "earth":
  //       return "Земля";
  //     default:
  //       return "0";
  //   }
  // };
  const renderFilters = (arr) => {
    return arr?.map((item) => {
      if (item === "all") {
        return;
      }
      return (
        <option key={item.name} value={item.name}>
          {item.label}
        </option>
      );
    });
  };
  const filter = renderFilters(filters);
  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={(e) => addNewHero(e)}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          value={power}
          onChange={(e) => setPower(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          // value={element}
          onChange={(e) => setElement(e.target.value)}
        >
          <option>Я владею элементом...</option>
          {filter}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
