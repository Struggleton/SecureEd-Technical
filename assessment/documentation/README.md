# Practice API Documentation

This documentation outlines the practice routes for the Passwords manager module. These routes are designed for your technical assessment.

## Passwords Module

### 1. Get Passwords

#### Endpoint: `GET /passwords`

#### Description:

Retrieve a list of passwords from the password manager.

Passwords are decrypted before being returned to the client.

#### Query Parameters:

- **username** (optional): Filter passwords by username.
- **website** (optional): Filter passwords by website.
- **id** (optional): Filter passwords by id.

These query parameters are optional. If no query parameters are provided, all passwords are returned.

If multiple query parameters are provided, the API should return passwords that match all of the query parameters.

#### Response:

- **200 OK**: Successful retrieval of passwords.
  ```json
  [
  	{
  		"id": 1,
  		"username": "john_doe",
  		"password": "securepassword123",
  		"website": "example.com"
  	}
  ]
  ```

If no passwords are found, the API should return an empty array.

### 2. Add Password

#### Endpoint: `POST /passwords`

#### Description:

Add a new password to the password manager.

Passwords are encrypted before being stored in the database.

#### Request:

- **Body**: Password object
  ```json
  {
  	"username": "john_doe",
  	"password": "securepassword123",
  	"website": "example.com"
  }
  ```

The API should validate the request body to ensure that all required fields are present. Any missing fields should result in a 400 Bad Request response.

#### Response:

- **201 Created**: Successful addition of password.
  ```json
  {
  	"id": "generatedId"
  }
  ```

If the password is successfully added, the API should return the id of the newly added password.

### 3. Update Password

#### Endpoint: `PATCH /passwords/:id`

#### Description:

Update an existing password in the password manager.

Passwords are encrypted before being stored in the database.

#### Request:

- **Body**: Password object
  ```json
  {
  	"username": "john_doe",
  	"password": "securepassword123",
  	"website": "example.com"
  }
  ```

If the ID for the password (from the URL param) does not exist, the API should return a 404 Not Found response.

The API will validate that the request body does not have ID which is not allowed to be updated. Each of the three updates are optional. If the request body does not have any of the three fields, the API should return a 400 Bad Request response.

If the password is in the update request, the API should encrypt the password before updating the password in the database.

#### Response:

- **204 No Content**: Successful update of password.

### 4. Delete Password

#### Endpoint: `DELETE /passwords/:id`

#### Description:

Delete an existing password from the password manager.

#### Response:

- **204 No Content**: Successful deletion of password.

If the password with the specified id does not exist, the API should return a 404 Not Found response.
