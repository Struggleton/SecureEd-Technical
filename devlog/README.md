
# Keeping a Devlog

  

## Table of Contents

  

- [Keeping a Devlog](#keeping-a-devlog)
- [Table of Contents](#table-of-contents)
- [Purpose](#purpose)
- [Structure](#structure)
- [Development Notes](#DevelopmentNotes)

## Purpose
The purpose of keeping a devlog is to help us see all the work you put in when attempting at least 4 tasks either in the frontend or backend folders. For instance, if you don't know anything about web APIs, express, and node and you decide to attempt the backend tasks. We would like to see in your devlog how you researched those technologies before starting the tasks. Another example could be your experience of overcoming a bug that took you 2 days to fix, giving you less time to work on other tasks.

We use this devlog to see how you solve problems you run into as you are developing. Research is an essential component to being a member of our team and it is a great way to learn new things!

## Structure
You can structure this devlog however you like. You could keep one file and mark the day and any noteworthy thing to write down. You could also keep a new file for everyday something noteworthy happens. You can use markdown, txt, word, etc. as long as we can read and access it.

## DevelopmentNotes
### 4/2/2024 -
- Begin development. I don't know very much about NodeJS/related technologies. Time to learn!! Set-up Postman, NodeJS environment
- When installing dependencies for the environment, **'express', a dependency in the project, had a moderate severity vulnerability in the version being used (dev4.17.21, dep4.18.3) where attackers can use malformed URLs to redirect users to malicious sites; described in vuln write-up (https://github.com/advisories/GHSA-rv95-896h-c2vc)**
	- Not sure how relevant for this project this vulnerability is, **but for the sake of safety it can be recommended that the project uses a version past 4.19.2 where this vulnerability is patched.**
	- ran '*npm audit fix*'
- Learned difference between devDependencies and normal dependency (dev is for use in development, like nodemon. normal is the ones only necessary for a normal user using it)
- Nodemon is for reloading the node application when any code changes are made (similar to Hot Reload in VS C# projects)

First initial thoughts
- GET request using Postman (127.1:3000/passwords) returns a json object with each password/id/website in plaintext. This is done with no required credentials to log into the database (maybe require a request with the proper credentials and/or encrypted responses.) which is dangerous I can imagine
- I found a bug where multiple GET requests cause passwords to become malformed.
	- This could be due to the constructor being called multiple times, which encrypts the passwords
	- Passwords are also not being decrypted before passing them to the user
- The naming conventions in database.ts and potentially other files is confusing as it uses the same names as private fields (which I do think may lead to potential confusion and coding errors because of it)
- I need to do a bug/unintended behavior write up on the password decryption not happening and finish the one on multiple GET requests

### 4/10/2024

- I think the type '*Password*' is confusing as it encapsulates more than a password. It includes fields for username, password, websites and an id. This type should be renamed to something more accurate to its usage (ex: LoginInfo)
- The database GET command does not take into account the id field. Adding a check for it
- Fixed the bug where passwords would become malformed on multiple get requests
- Also fixed the issue where passwords were not being decrypted before sending it to the user.
- I found out that the passwords.routehandler.ts file wasn't taking into account the username query string when passing the query to the getPasswords function

### 4/11/2024
- The server was not checking for the website part of the password, fixed that
- I want to make a more extensible way of checking for fields. Ideally there'd be a lookup table for each field and its error message
- Are the passwords supposed to be saved back to the file passwords file? I'm going to assume not but I'm going to write a function for saving it back to a file just in case
- I fixed the server returning the username instead of the ID for the password

### 4/12/2024
- I shortened the code validating the password fields using ?? operators and a nested function
- There should be some code to validate if the body is formatted properly.
	- Added a message to the middleware to see if it returns a SyntaxError (error thrown when the body is invalid), and tell the user that their JSON body is invalid.
- The message for being unable to update an ID should be a little more detailed I think
- Fixed an issue where the updated password wasn't getting taken into account
- I moved the nested function that I use to throw errors outside so that the other functions can use it to throw errors.
	- Not sure if it's better just to use 'throw new ServiceError()' versus creating a helper function. But I use the helper function during the null checks
- I wonder if there's a module or something that enforces style checks. I will look into that because I want the project to follow a consistent style, and since this is my first time programming Javascript/Typescript, I don't know proper coding conventions. Rust has a module called rustfmt that can be run to apply common Rust coding conventions to the code
- I should've been better at logging bugs in the bugs.md document. I wrote about the bugs here but didn't write what was happening prior to fixing the bug
- When using the delete method more than once, regardless of the ID; whether it exists or not, it removes a password from the list. It splices the array, removing the password at the index it finds. In this case there is no check to see if it actually found the password, it gets the index of -1 (because the password doesn't exist) and splices it back together. 
- I fixed this by having the method return the index of the password it is searching for. If it exists, delete it, but if it doesn't throw a serviceerror (BadRequest) 
- Just implemented password saving to file. It is currently commented out but if need be it is there to save passwords
- I have no idea what the import in idatabase.ts is (Todo) does but it seems to be harmless removing it, and it throws a warning so I'm removing it
- I've finished fixing the bugs I can find. I am currently reviewing/updating the bugs.md documentation
	- I changed the checks in the password creation from null coalescing to explicit if checks because I don't want the user to input an empty string and have the server think it is valid.