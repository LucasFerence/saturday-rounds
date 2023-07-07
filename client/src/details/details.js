/**
 * TODO: Should we consider transitioning this to TypeScript
 * for better type safety?
 *
 * Access the detail API and manage data from the backend
 */
export class Details {

  /*

  Couple ideas:
  > Since most operations are going to be read, we need a way to get an item
  and give full control of the item to the caller. This item cannot be written

  This can be written something like...

  ---
  const course = getItem(predicate) or something
  ---

  Or to get many items

  const [courses] = getItems(predicate)

  > In the case of write operations, we need a way to keep access of the item

  This can look something like...

  ---
  withItem(predicate, (course, writeFunc) => {
    ... do something with the course
    ... if you wanna write do something like this
    writeFunc.accept(course);
  })
  ---

  Can also have something like to update multiple items

  ---
  withItems(predicate, ([courses], writeFunc) => {
    .. Update one or many courses
    for (course in courses) {
      if (we want to update it) {
        writeFunc.accept(course);
      } else {
        we can ignore it and not write it here
      }
    }
  })
  ---

  */
}

/**
 * Predicate to query for data
 */
export class Predicate {
  // Add predicate options
}

/**
 * Tool to build predicates easily
 */
export class PredicateBuilder {
  // Add builders options
}
