# Cyber4All/SecurEd Technical Assessment

First, we want to thank you for taking time out of your schedule to complete this technical assessment. Being a student keeps you busy and is hard work so thank you for taking this assessment as it helps us guage where you are currently as a developer.

Good luck!

## Table of Contents

- [Cyber4All/SecurEd Technical Assessment](#cyber4allsecured-technical-assessment)
  - [Table of Contents](#table-of-contents)
  - [Assessment Criteria](#assessment-criteria)
  - [Installation Requirements](#installation-requirements)
  - [Development Log](#development-log)
  - [Application Summary](#application-summary)
    - [Folder Structure](#folder-structure)
    - [Database Schema](#database-schema)
  - [Getting Started](#getting-started)

## Assessment Criteria

In order to complete this assessment, we ask that you attempt to find all the bugs that are in the project and fix them. You will find the documentation/requirements for the project in the [documentation](assessment/documentation/README.md) folder. This is where you will find all the requirements for the project. Use this to help you understand what the project is supposed to do and how it is supposed to work.

The purpose of this assessment is to test your ability to find and fix bugs as well as being able to understand and work with a codebase that you are not familiar with. We are not looking for all the bugs to be found and fixed, but we are looking for you to find as many as you can, explain them, and fix them to the best of your ability. We are also looking for you to be able to understand the requirements and implement them as well.

## Installation Requirements

Below is what you'll need to install on your computer to get started with this application:

- [Visual Studio Code - Or some other text editor](https://code.visualstudio.com/)
- [NodeJS](https://nodejs.org/)

## Development Log

You are encouraged to keep a development log as you work through this assessment. This will help us understand your thought process and how you work through problems. You can structure this devlog however you like. You could keep one file and mark the day and any noteworthy thing to write down. You could also keep a new file for everyday something noteworthy happens. You can use markdown, txt, word, etc. as long as we can read and access it.

You can use the [devlog](devlog/README.md) file in the devlog folder to keep track of your progress.

While you are working on this assessment, please keep track of all the bugs that you have identified. You can use the [bugs](devlog/bugs.md) file in the devlog folder to keep track of all the bugs that you have found.

For each bug that you find, please include the following:

- A description of the bug
- The steps to reproduce the bug
- The expected behavior
- The actual behavior
- The file and line number where the bug is located
- The fix for the bug

## Application Summary

This application is a simple password manager. It allows you to add, delete, update, and retrieve passwords from a database.

### Folder Structure

Below is the folder structure of the application:

```plaintext
assessment/
├── documentation/
│   └── README.md
├── src/
│   ├── config/
│   │   └── encrypt.ts
│   │   └── env.ts
│   │   └── express-config.ts
│   ├── database/
│   │   └── database.ts
│   │   └── idatabase.ts
│   ├── modules/
│   │   └── passwords/
│   │   │   └── passwords.component.ts
│   │   │   └── passwords.routehandler.ts
│   ├── shared/
│   │   └── error.ts
│   │   └── types.ts
|   ├── app.ts
```

### Database Schema

Below is how Passwords are stored in the database:

| Field    | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| id       | number | The id of the password          |
| username | string | The username of the password    |
| password | string | The password                    |
| website  | string | The website the password is for |

## Getting Started

We recommend first starting the application by running the following commands:

```bash
npm install
```

This installs all the dependencies for the application.

```bash
npm run start
```

This starts the application.

We recommend using Postman to test the application; however feel free to use any API testing tool that you are comfortable with.
