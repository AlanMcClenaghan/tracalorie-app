// App Controller
const App = ((ItemCtrl, StorageCtrl, UICtrl) => {

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

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();

    } else {
      alert("Please enter a meal and number of calories")
    }
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

    // Update Local Storage
    StorageCtrl.updateItemStorage(updatedItem);

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

    // Delete from Local Storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();
  }

  // Clear item event
  const clearAllItemsClick = () => {

    let confirmed = confirm("Are you sure? All your data will be deleted.");

    if (confirmed == true) {
      // Delete all items from the data structure
      ItemCtrl.clearAllItems();

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the UI
      UICtrl.showTotalCalories(totalCalories);

      // Remove form UI
      UICtrl.removeItems();

      // Clear all from local storage
      StorageCtrl.clearItemsFromStorage();

      // Hide UL
      UICtrl.hideList();

    }
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
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialise App
App.init()