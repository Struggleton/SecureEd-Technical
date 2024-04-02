# Keeping a Devlog

## Table of Contents

- [Keeping a Devlog](#keeping-a-devlog)
  - [Table of Contents](#table-of-contents)
  - [Purpose](#purpose)
  - [Structure](#structure)

## Purpose

The purpose of keeping a devlog is to help us see all the work you put in when attempting at least 4 tasks either in the frontend or backend folders.  For instance, if you don't know anything about web APIs, express, and node and you decide to attempt the backend tasks.  We would like to see in your devlog how you researched those technologies before starting the tasks.  Another example could be your experience of overcoming a bug that took you 2 days to fix, giving you less time to work on other tasks.

We use this devlog to see how you solve problems you run into as you are developing. Research is an essential component to being a member of our team and it is a great way to learn new things! 

## Structure

You can structure this devlog however you like.  You could keep one file and mark the day and any noteworthy thing to write down.  You could also keep a new file for everyday something noteworthy happens.  You can use markdown, txt, word, etc. as long as we can read and access it.

4/2/2024 - begin development. I don't know very much about NodeJS/related technologies. Time to learn!! Set-up Postman, NodeJS environment
  - When installing dependencies for the environment, 'express', a dependency in the project, had a moderate severity vulnerability in the version being used (dev4.17.21, dep4.18.3) where attackers can use malformed URLs to redirect users to malicious sites; described in vuln write-up (https://github.com/advisories/GHSA-rv95-896h-c2vc)
    - Not sure how relevant for this project this vulnerability is, but for the sake of safety it can be recommended that the project uses a version past 4.19.2 where this vulnerability is patched.
    - ran 'npm audit fix'
  - Learned difference between devDependencies and normal dependency (dev is for use in development, like nodemon. normal is the ones only necessary for a normal user using it)
  - Nodemon is for reloading the node application when any code changes are made (similar to Hot Reload in VS C# projects)

  First initial thoughts
  - GET request using Postman (127.1:3000/passwords) returns a json object with each password/id/website in plaintext. This is done with no required credentials to log into the database (maybe require a request with the proper credentials and/or encrypted responses.) which is dangerous since GET requests can be cached and  
    - I assume this output is n

  - Initial questions
    Is there a way to remove 