import { useState } from "react";
import "./style.css";

const Carousel = () => {
  const users = [{ name: "John" }, { name: "Ed" }, { name: "Murray" }];
  const [active, setActive] = useState(1);

  const handleCardClick = (name) => {
    console.log("handle click");
    setActive(name);
  };

  const isActiveUser = (name) => {
    if (active === name) return 1;
  };

  const createCard = (users) => {
    return users.map((user, index) => {
      return (
        <div
          key={index}
          className={`card ${isActiveUser(user.name) ? "active" : ""}`}
          onClick={() => handleCardClick(user.name)}
        >
          <div>{user.name}</div>
        </div>
      );
    });
  };

  return (
    <div className="Carousel">
      <br />
      <div>Carousel</div>
      <br />
      <div className="card-container">{createCard(users)}</div>
    </div>
  );
};

export default Carousel;
