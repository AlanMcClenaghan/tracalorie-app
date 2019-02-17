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
    addItem: (name, calories) => {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length.length - 1].id + 1;
      } else {
        ID = 0
      }
      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    logData: () => {
      return data;
    }
  }

})();


// UI Controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list',
    addbtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
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
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    getSelectors: () => {
      return UISelectors;
    }
  }
})();


// App Controller
const App = ((ItemCtrl, UICtrl) => {

  // Load event listeners
  const loadEventListeners = () => {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addbtn).addEventListener('click', itemAddSubmit);
  }


  // Add item sumbit
  const itemAddSubmit = (e) => {
    e.preventDefault();
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input 
    if (input.name !== '' && input.calories !== '') {
      console.log(input.name, input.calories)
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    } else {
      console.log('Please complete both inputs')
    }



  }



  // Public methods
  return {
    init: () => {
      // Fetch items from data structure
      const items = ItemCtrl.getItems()
      console.log(items)
      // Populate list with items
      UICtrl.populatItemList(items);
      // Load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

// Initialise App
App.init()