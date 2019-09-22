import Item1 from "../../images/fridge.jpg";
import Item2 from "../../images/mobile.jpg";
import Item3 from "../../images/tv.png";

import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  SUB_SHIPPING,
  CHECKOUT
} from "../actions/action-types/cart-actions";

const initState = {
  items: [
    {
      id: 1,
      title: "Godrej RD EDGE 200 WHF Refrigerator - Wine Red",
      desc:
        "We ensure that all our refrigerants are 100% environmentally friendly, ensuring that your enironment is protected without compromising on your daily usage ...",
      price: 13000,
      img: Item1
    },
    {
      id: 2,
      title: "Xiaomi Redmi Note 7 Pro",
      desc:
        "The Xiaomi Redmi Note 7 Pro is a good option to buy in the mid-range budget. The configuration of the smartphone quite good to perform well. The smartphone comes with a huge storage space for storing large amount of data or files. ",
      price: 15000,
      img: Item2
    },
    {
      id: 3,
      title: '80cm (32") N4305 Smart HD TV',
      desc:
        "Now, stream a wide variety of entertainment content through our International, Indian and News Partners.",
      price: 45000,
      img: Item3
    }
  ],
  addedItems: [],
  total: 0
};
const cartReducer = (state = initState, action) => {
  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find(item => item.id === action.id);
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.id === item.id);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find(item => action.id === item.id);
    let new_items = state.addedItems.filter(item => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    console.log(itemToRemove);
    return {
      ...state,
      addedItems: new_items,
      total: newTotal
    };
  }

  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find(item => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find(item => item.id === action.id);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter(item => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal
      };
    }
  }
  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total: state.total + 100
    };
  }

  if (action.type === SUB_SHIPPING) {
    return {
      ...state,
      total: state.total - 100
    };
  }
  if (action.type === CHECKOUT) {
    return {
      ...state,
      addedItems: [],
      total: 0
    };
  } else {
    return state;
  }
};

export default cartReducer;
