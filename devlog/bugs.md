# Bugs

This is where you will keep track of all the bugs that you have found.

## Example Bug

- **Description**: The application crashes when I click the "Add Password" button.
- **Steps to Reproduce**:
  1. Go to the "Add Password" page.
  2. Click the "Add Password" button.
  3. The application crashes.
- **Expected Behavior**: The application should not crash when I click the "Add Password" button.
- **Actual Behavior**: The application crashes when I click the "Add Password" button.
- **File and Line Number**: `src/modules/passwords/passwords.routehandler.ts:23`
- **Fix**: I forgot to add a check to see if the password already exists in the database. I added a check to see if the password already exists in the database and return a 400 Bad Request response if it does.
- **Date**: 2021-01-01

Feel free to use this example as a template or create your own format for keeping track of bugs.

## Bugs

TODO
