// Storage Controller


// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      // { id: 0, name: 'Steak Dinner', calories: 1200 },
      // { id: 1, name: 'Cookie', calories: 400 },
      // { id: 2, name: 'Eggs', calories: 300 },
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
        ID = data.items[data.items.length - 1].id + 1;
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
    getItemById: (id) => {
      let found = null;
      // Loop through items
      data.items.map((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: (name, calories) => {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.map((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: (id) => {
      // Get ids
      const ids = data.items.map((item) => {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);

    },
    clearAllItems: () => {
      data.items = [];
    },
    setCurrentItem: (item) => {
      data.currentItem = item;
    },
    getCurrentItem: () => {
      return data.currentItem;
    },
    getTotalCalories: () => {
      let total = 0;

      // Loop through items and add calories
      data.items.map(item => {
        total += item.calories;
      });

      // Set total calories in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
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
    listItems: '#item-list li',
    addbtn: '.add-btn',
    updatebtn: '.update-btn',
    deletebtn: '.delete-btn',
    backbtn: '.back-btn',
    clearbtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '#total-calories'
  }

  // Public methods
  return {
    populatItemList: (items) => {
      let html = '';
      items.map((item) => {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
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
    addListItem: item => {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `
        <strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: (item) => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into array
      listItems = Array.from(listItems);

      listItems.map((listItem) => {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          `
        }
      });
    },
    deleteListItem: (id) => {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState()
    },
    removeItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn mode list into array
      listItems = Array.from(listItems);

      listItems.map((item) => {
        item.remove();
      })
    },
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.addbtn).style.display = 'inline';
      document.querySelector(UISelectors.updatebtn).style.display = 'none';
      document.querySelector(UISelectors.deletebtn).style.display = 'none';
      document.querySelector(UISelectors.backbtn).style.display = 'none';
    },
    showEditState: () => {
      document.querySelector(UISelectors.addbtn).style.display = 'none';
      document.querySelector(UISelectors.updatebtn).style.display = 'inline';
      document.querySelector(UISelectors.deletebtn).style.display = 'inline';
      document.querySelector(UISelectors.backbtn).style.display = 'inline';
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

    // Disable sumit on enter
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updatebtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deletebtn).addEventListener('click', itemDeleteSubmit);

    // Back button event
    document.querySelector(UISelectors.backbtn).addEventListener('click', (e) => {
      e.preventDefault();
      UICtrl.clearEditState();
    });

    // Clear items event
    document.querySelector(UISelectors.clearbtn).addEventListener('click', clearAllItemsClick);
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
      // Add item to UI list
      UICtrl.addListItem(newItem);
    } else {
      console.log('Please complete both inputs')
    }

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    // Clear fields
    UICtrl.clearInput();
  }

  // Click edit item
  const itemEditClick = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('edit-item')) {
      // get list item id 
      const listId = e.target.parentNode.parentNode.id
      // Break into an array
      const listArr = listId.split('-');
      // Get the actual id
      const id = parseInt(listArr[1]);
      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
  }

  // Update item submit
  const itemUpdateSubmit = (e) => {
    e.preventDefault();
    // Get item input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  }

  // Delete button event
  const itemDeleteSubmit = (e) => {
    e.preventDefault();

    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  }

  // Clear item event
  const clearAllItemsClick = () => {
    // Delete all items from the data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove form UI
    UICtrl.removeItems();

    // Hide UL
    UICtrl.hideList();
  }


  // Public methods
  return {
    init: () => {
      // Clear edit state / set initial state
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems()

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populatItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

// Initialise App
App.init()