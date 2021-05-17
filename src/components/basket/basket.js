import React from "react";
import { Component } from "react";
import BasketItem from "../basket-item/basket-item";
import "./style.scss";

class Basket extends Component {
  state = {
    basket: this.props.basket,
  };

  componentDidUpdate(prevProps) {
    if (this.props.basket !== prevProps.basket) {
      this.setState({
        basket: this.props.basket,
      });
    }
  }

  render() {
    const { basket } = this.state;
    const { deleteItems, changeItems, usd } = this.props;
    const sum = (acc, el) => (acc += Math.ceil(el[1].price * usd) * el[1].count);
    return (
      <div className="module">
        <div className="basket">
          <div className="basket__row basket__title">
            <div className="basket__cell basket__name">
              Наименование товара и описание
            </div>
            <div className="basket__cell basket__count">Количество</div>
            <div className="basket__cell basket__price">Цена</div>
            <div className="basket__cell"></div>
          </div>
          {Object.entries(basket).map((el) => {
            return (
              <BasketItem
                deleteItems={deleteItems}
                changeItems={changeItems}
                item={el}
                key={el[0]}
                usd={usd}
              />
            );
          })}
        </div>
        <div className="basket__sum">
          <span>Общая стоимость:</span>
          <span className="basket__sum-numbers">
            {Object.entries(basket).reduce(sum, 0)} руб.
          </span>
        </div>
      </div>
    );
  }
}

export default Basket;
