import axios from 'axios';

/**
 * Predicate to query for data.
 * Required to interact with the Details API
 */
export class Predicate {
  /**
   * Construct a simple predicate with a type and ID
   * @param {string} type type of object (defined in schemas)
   * @param {string} id id of object
   */
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }
}

/**
 * Create a new auth configuration with the current token
 * @param {string} token
 * @return {*}
*/
function createAuth(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Validates the provided predicate
 * @param {Predicate} predicate
 * @return {boolean}
 */
function validatePredicate(predicate) {
  return (predicate && predicate.id && predicate.type);
}

/**
 * Access the detail API and manage data from the backend
 */
export class Details {
  /**
   * Construct a new Details API instance with a token
   * @param {string} token
   */
  constructor(token) {
    this.auth = createAuth(token);
  }

  /**
   * Retrieve an item for use with a predicate
   * @param {Predicate} predicate
   * @param {*} callback
   */
  withItem(predicate, callback) {
    if (!validatePredicate(predicate)) {
      return;
    }

    axios.get(`${predicate.type}/${predicate.id}`, this.auth)
        .catch((err) => {
          // TODO: Do something with the error
        })
        .then((res) => {
          // TODO: Add response validation/failure handling
          callback(res.data);
        });
  }

  /**
   * Update an item matching the predicate
   * @param {Predicate} predicate
   * @param {*} updateFunc
   */
  updateItem(predicate, updateFunc) {
    if (!validatePredicate(predicate)) {
      return;
    }

    this.withItem(predicate, (item) => {
      // First call the update function with the item
      updateFunc(item);

      // Update the item in the backend
      axios.post(`${predicate.type}/update`, item, this.auth)
          .catch((err) => {
            // TODO: Do something with the error
          })
          .then((res) => {
            // What should we do with the response?
          });
    });
  }
}
