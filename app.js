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
      { id: 1, name: 'Cookie', calories: 400 },
      { id: 2, name: 'Eggs', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: () => {
      return data.items;
    },
    logData: () => {
      return data;
    }
  }

})();


// UI Controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list'
  }

  // Public methods
  return {
    populatItemList: (items) => {
      let html = '';
      items.map((item) => {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: <em>${item.calories} Calories</em>
              <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
              </a>
            </strong>
          </li>
        `
      });
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    }
  }
})();


// App Controller
const App = ((ItemCtrl, UICtrl) => {
  // Public methods
  return {
    init: () => {
      // Fetch items from data structure
      const items = ItemCtrl.getItems()
      console.log(items)
      // Populate list with items
      UICtrl.populatItemList(items);
    }
  }
})(ItemCtrl, UICtrl);

// Initialise App
App.init()