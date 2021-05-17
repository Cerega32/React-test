import React from "react";
import basketImg from "./basket.png";
import "./style.scss";

const Items = (props) => {
  const { items, addItems, categories, usd, increment } = props;

  return (
    <div className="items">
      {Array.from(categories).map((category) => {
        return (
          <div key={category} className="items__categories">
            <p className="items__title">{category}</p>
            <div className="items__category">
              {items
                .filter((el) => el.category === category)
                .map((el) => {
                  return (
                    <div key={el.id} className="items__item">
                      <p className="items__item-title">{`${el.title}(${el.quantity})`}</p>
                      <div>
                        <button
                          onClick={() => addItems(el)}
                          className="items__item-btn"
                        >
                          <img src={basketImg} alt="добавить в корзину" />
                        </button>
                      </div>
                      <span
                        className="items__item-price"
                        style={{ color: `${increment}` }}
                      >
                        {Math.ceil(el.price * usd)}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Items;
