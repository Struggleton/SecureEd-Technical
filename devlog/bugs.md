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

- **Description**: When using the GET command, the password fields returned are still encrypted when they should be decrypted / plaintext.
- **Steps to Reproduce**:
  1. Connect to the server and issue a GET command to /passwords
  2. The application should return a JSON string with the password list, where the passwords are encrypted.
- **Expected Behavior**: The application should return a JSON body with unencrypted passwords.
- **Actual Behavior**: The application returns a JSON with encrypted passwords.
- **File and Line Number**: `src/database/database.ts:46`
- **Fix**: Create a new password array, copy the original passwords to it and Iterate through the password list and decrypt the password field.
- **Date**: 2024-04-02 / 2024-04-10 (commits 6f4e1c0/84d0b52)

- **Description**: When using the GET command multiple times, all passwords and their password field become re-encrypted 
- **Steps to Reproduce**:
  1. Connect to the server and issue two or more GET commands to /passwords 
  2. The application should initially return unencrypted passwords (given the prior change above) but will become encrypted and subsequent GET commands will encrypt already encrypted passwords.
- **Expected Behavior**: The application should return unencrypted password lists.
- **Actual Behavior**: The application returns a JSON with encrypted passwords that become double (or more) encrypted
- **File and Line Number**: `src/database/database.ts:29`
- **Fix**: The `getInstance` function incorrectly implements the Singleton design pattern, where it returns a new Database object (which encrypts the passwords.) Check to see if the instance is null and if it is, create it and then return the instance. 
- **Date**: 2024-04-02 (commits 246ef75)

- **Description**: When using the GET command with queries, the queries are not applied and returns all passwords, regardless if they fall under the query or not.
- **Steps to Reproduce**:
  1. Connect to the server and issue the GET command with any query string (/passwords?website for example)
  2. The server will return all passwords, regardless of the query entered.
- **Expected Behavior**: The application should apply filters to the password list and return a list of passwords that fit the query criteria.
- **Actual Behavior**: The application returns all passwords.
- **File and Line Number**: `src/database/database.ts:47`
- **Fix**: The application is returning the instance member rather than the variable created in the function. Return `passwords` instead of `this.passwords`.
- **Date**: 2024-04-10 (commit 84d0b52)

- **Description**: When using the GET command with the id or username queries, the queries are ignored.
- **Steps to Reproduce**:
  1. Connect to the server and issue the GET command with either the id or username query.
  2. The server will ignore the queries and not apply the filters.
- **Expected Behavior**: The application should apply the id/username filters to the password list and return a list of passwords that fit the query criteria.
- **Actual Behavior**: The application returns all passwords.
- **File and Line Number**: `src/database/database.ts:37` and `src\modules\passwords\passwords.routehandler.ts:20`
- **Fix**: The database.ts file is missing a check for the id query, and the passwords.routehandler.ts file is not adding the username string to the query passed to the database.getPasswords method. Add a check and add the username field to the query.
- **Date**: 2024-04-10 (commit 84d0b52)

- **Description**: When adding a new password to the list using the POST command, the server returns the username of the password entry, rather than the id. The server also returns plaintext instead of a json formatted string.
- **Steps to Reproduce**:
  1. Connect to the server and issue the POST command with a properly formatted JSON body.
  2. The server will return the username of the password, rather than the id of the new password, in plaintext.
- **Expected Behavior**: The application should add the password to the list and return the id of the newly created entry.
- **Actual Behavior**: The application returns the username instead of the id in plaintext.
- **File and Line Number**: `src\modules\passwords\passwords.component.ts:50` and `src\modules\passwords\passwords.routehandler.ts:37`
- **Fix**: Return the newPassword's id instead of the username and return a JSON formatted string in the response.
- **Date**: 2024-04-12 (commit 25ea843 and b273cd2)

- **Description**: When issuing a POST command, the website portion of body is not checked for, meaning users can create password entries without a website field.
- **Steps to Reproduce**:
  1. Connect to the server and issue the POST command with a JSON body without the website field entered. 
  2. The server will return no error and add the password without a website field
- **Expected Behavior**: The server should return a Bad Request (400) error.
- **Actual Behavior**: The server returns normally and adds a invalid password entry.
- **File and Line Number**: `src\modules\passwords\passwords.component.ts:39`
- **Fix**: Check for the website field of the query. If it is null / undefined, throw a bad request error.
- **Date**: 2024-04-12/13 (commit b273cd2 / 39082df)

- **Description**: When attempting to update a password with the PATCH command, it will always fail because the password can not be found.
- **Steps to Reproduce**:
  1. Connect to the server and issue the PATCH command with the passwords/id url parameter and a properly formatted JSON body.
  2. The server will return a Not Found (404)
- **Expected Behavior**: The server should be able to find the password, update it and return a 204 response.
- **Actual Behavior**: The server is unable to find the password and fails with updating it.
- **File and Line Number**: `src\modules\passwords\passwords.routehandler.ts`
- **Fix**: Remove the id= tag from the request parameters string. 
- **Date**: 2024-04-12 (commit e7f2903)

- **Description**: When attempting to update a password with the PATCH command, the password field in the body is ignored.
- **Steps to Reproduce**:
  1. Connect to the server and issue the PATCH command with the passwords/id url parameter and a properly formatted JSON body.
  2. The server will update the password entry but ignore any updates to the password field.
- **Expected Behavior**: The server should be able to find the password entry and update all fields of the entry
- **Actual Behavior**: The server ignores the password field in the JSON body while updating the other fields.
- **File and Line Number**: `src\modules\passwords\passwords.component.ts:66`
- **Fix**: Use the password field from the `updates` parameter instead of reassigning the same `password.password` field.
- **Date**: 2024-04-12 (commit ad58993)

- **Description**: When updating a password using the PATCH command, the newly assigned password is not encrypted, causing GET commands to fail that don't include a query to filter the updated password out.
- **Steps to Reproduce**:
  1. Connect to the server and issue the PATCH command with the passwords/id url parameter and a properly formatted JSON body.
  2. The server will update the password entry but will leave the password unencrypted.
  3. Issue a GET command and the server will throw an Internal Server Error (500)
- **Expected Behavior**: The server should be able to find the password entry and update the fields, encrypting the password.
- **Actual Behavior**: The server updates the fields but fails to encrypt the password.
- **File and Line Number**: `src\modules\passwords\passwords.component.ts:66`
- **Fix**: Pass the updated password field through the encryption service function to encrypt the password before updating it.
- **Date**: 2024-04-12 (commit ad58993)

- **Description**: When updating a password using the PATCH command, the fields in the JSON body are not checked whether or not they exist.
- **Steps to Reproduce**:
  1. Connect to the server and issue the PATCH command with the passwords/id url parameter and with one or more fields missing from the JSON body.
  2. The server will accept the request and update the fields that exist.
- **Expected Behavior**: The server should require the field to exist (but can be optional by entering an empty string)
- **Actual Behavior**: The server accepts the invalid request and updates the password entry anyway.
- **File and Line Number**: `src\modules\passwords\passwords.component.ts:64`
- **Fix**: Add null coalescing checks to see if the fields exist, and if not, throw a Bad Request error.
- **Date**: 2024-04-12 (commit ad58993)

- **Description**: When attempting to delete a password using the DELETE command, even if the ID is not matching, the function runs anyway and removes a password entry from the top of the list.
- **Steps to Reproduce**:
  1. Connect to the server and issue the DELETE command using the passwords/id url parameter and enter an ID that doesn't exist.
  2. The server will delete the top most password entry, despite not matching the ID given.
- **Expected Behavior**: The server should only delete the password if it exists, and if it doesn't, throw a Not Found error (404)
- **Actual Behavior**: The server accepts the invalid request and deletes the top most password anyway.
- **File and Line Number**: `src\database\database.ts:72` and `src\modules\passwords\passwords.component.ts:82`
- **Fix**: Check to see if the index from the find function is not -1. If it is, do not delete a password. Return the index and have the password.component.ts function return a Not Found error if it is negative.
- **Date**: 2024-04-12 (commit a655439)