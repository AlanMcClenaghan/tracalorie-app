// Storage Controller


// Item Controller
const ItemCtrl = (() => {
  // Item Constructor
  const Item = (id, name, calories) => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 0, name: 'Cookie', calories: 400 },
      { id: 0, name: 'Eggs', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    logData: () => {
      return data;
    }
  }

})();


// UI Controller
const UICtrl = (() => {
  // Public methods
  return {

  }
})();


// App Controller
const App = ((ItemCtrl, UICtrl) => {
  // Public methods
  return {
    init: () => {
      console.log('Initialising App...')
    }
  }
})(ItemCtrl, UICtrl);

// Initialise App
App.init()