import React from "react";
import { Component } from "react";

class BasketItem extends Component {
  state = {
    inputValue: this.props.item[1].count,
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.item[1].count !== prevProps.item[1].count) {
      this.setState({
        inputValue: this.props.item[1].count,
      });
    }
  };

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value }, () => {
      this.props.changeItems(this.props.item[0], this.state.inputValue);
    });
  };

  handleBlur = (max) => {
    if (this.state.inputValue > max) {
      this.setState({ inputValue: max }, () => {
        this.props.changeItems(this.props.item[0], this.state.inputValue);
      });
      return;
    }
    if (this.state.inputValue < 1) {
      this.setState({ inputValue: 1 }, () => {
        this.props.changeItems(this.props.item[0], this.state.inputValue);
      });
      return;
    }
    this.setState(
      ({ inputValue }) => {
        return {
          inputValue: Math.floor(inputValue),
        };
      },
      () => {
        this.props.changeItems(this.props.item[0], this.state.inputValue);
      }
    );
  };

  render() {
    const { inputValue } = this.state;
    const { item, deleteItems, usd } = this.props;
		const sum = Math.ceil(item[1].price * usd);
    return (
      <div key={item[0]} className="basket__row">
        <div className="basket__name basket__cell">{item[1].title}</div>
        <div className="basket__cell">
          <input
            className="basket__count basket__input"
            type="number"
            value={inputValue}
            onChange={this.handleChange}
            step="1"
            min="1"
            max={item[1].quantity}
            onBlur={() => this.handleBlur(item[1].quantity)}
          />
        </div>
        <div className="basket__price basket__cell">
          {sum} руб/шт.
        </div>
        <div className="basket__cell">
          <button
            onClick={() => deleteItems(item[0])}
            className="basket__delete"
          >
            Удалить
          </button>
        </div>
      </div>
    );
  }
}

export default BasketItem;
