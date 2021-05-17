import React from "react";
import { Component } from "react";
import dataJson from "../../json/data.json";
import namesJson from "../../json/names.json";
import Basket from "../basket/basket";
import Items from "../items/items";
import "./style.scss";
import basketImg from "./basket.png";

class App extends Component {
  state = {
    basket: JSON.parse(localStorage.getItem("basket")) || {},
    showModal: false,
    usd: 50,
    increment: "black",
  };

  componentDidMount = () => {
    this.interval = setInterval(() => {
      const rand = Math.random() * 60 + 20;
      this.setState(({ usd }) => {
        if (rand > usd) {
          return {
            increment: "red",
            usd: rand,
          };
        }
        if (rand < usd) {
          return {
            increment: "green",
            usd: rand,
          };
        }
        return {
          increment: "black",
        };
      });
    }, 1500);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  handleShowModal = () => {
    this.setState(({ showModal }) => {
      return {
        showModal: !showModal,
      };
    });
  };

  handleDeleteItem = (id) => {
    const { basket } = this.state;
    const { [id]: _, ...newBasket } = basket;
    this.setState({ basket: newBasket }, () => {
      localStorage.setItem("basket", JSON.stringify(this.state.basket));
    });
  };

  handleAddItems = (item) => {
    if (this.state.basket[item.quantity]) {
      const count = +this.state.basket[item.quantity].count;
      const max = this.state.basket[item.quantity].quantity;
      const currentItem = {
        ...this.state.basket[item.quantity],
        count: count + 1 > max ? max : count + 1,
      };
      this.setState(
        {
          basket: {
            ...this.state.basket,
            [item.quantity]: currentItem,
          },
        },
        () => {
          localStorage.setItem("basket", JSON.stringify(this.state.basket));
        }
      );
      return;
    }
    this.setState(
      {
        basket: {
          ...this.state.basket,
          [item.quantity]: { ...item, count: 1 },
        },
      },
      () => {
        localStorage.setItem("basket", JSON.stringify(this.state.basket));
      }
    );
  };

  handleChangeCountItems = (id, count) => {
    const changedItem = this.state.basket[id];
    changedItem.count = count;
    this.setState(
      {
        basket: { ...this.state.basket, [id]: changedItem },
      },
      () => {
        localStorage.setItem("basket", JSON.stringify(this.state.basket));
      }
    );
  };

  render() {
    const categories = new Set();
    const items = dataJson.Value.Goods.map((el) => {
      categories.add(namesJson[el.G].G);
      return {
        price: el.C,
        id: el.T,
        quantity: el.P,
        category: namesJson[el.G].G,
        title: namesJson[el.G].B[el.T].N,
      };
    });

    const { showModal, basket, usd, increment } = this.state;
    return (
      <div className="main">
        <button onClick={this.handleShowModal} className="main__basket">
          <img src={basketImg} alt="корзина" />
        </button>
        {showModal ? (
          <Basket
            basket={basket}
            deleteItems={this.handleDeleteItem}
            changeItems={this.handleChangeCountItems}
            usd={usd}
          />
        ) : null}
        <Items
          items={items}
          categories={categories}
          addItems={this.handleAddItems}
          usd={usd}
          increment={increment}
        />
      </div>
    );
  }
}

export default App;
