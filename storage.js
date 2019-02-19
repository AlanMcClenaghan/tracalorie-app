// Storage Controller
const StorageCtrl = (() => {
  //
  return {
    storeItem: (item) => {
      let items;
      // Check if any items in local storage
      if (localStorage.getItem('items') === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set local storage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in local storage
        items = JSON.parse(localStorage.getItem('items'));
        // Push new item
        items.push(item);
        // Reset local storage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: () => {
      let items;
      // Check if any items in local storage
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        // Get what is already in local storage
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: (updatedItem) => {
      let items = JSON.parse(localStorage.getItem('items'));

      items.map((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: (id) => {
      let items = JSON.parse(localStorage.getItem('items'));

      items.map((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: () => {
      localStorage.removeItem('items');
    }
  }
})();