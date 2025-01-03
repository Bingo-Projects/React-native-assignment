# Task

You have to build an application using **react native expo** so that it could be seen in both IOS & Android. A backend folder is provided to you use the APIs to communicate with backend and use state management so that once the user registered or logged in they should not see the same login/register screen again when re-opening the applications.


## What we expect

* ***App opening screen*** - Which will show when the app is opened (for 4 seconds a animation should run and than a logo should be displayed for 2 seconds)
* ***Login screen*** - Where if user have an account they could login. (email, password)
* ***Register screen*** - Where if user does not have an account they could register. (email, password, confirm password).
* ***Home screen*** - doesn't need to be fancy just display user's email address & session id.
* The code should be well structured & readable.
* **Design** is the most important thing so try using custom google fonts, animations & effects so make the user experience more enjoyable.
* You are free to choose any library you like (avoid using unknown or very less downloaded libraries).
* Use of **Typescript** is encouraged

## Backend

The backend is build using nodejs & mongodb so you should have node & mongodb installed in your device.

    git clone https://github.com/Bingo-Projects/React-native-assignment.git
    cd React-native-assignment
    npm i
    node index.js


## Registration Steps

***Step 1***
> [POST]     http://backend:4000/api/consumer/auth/register

JSON: **email**="String" & **pass**="String"

Response :-

    { "success":  true, "msg":  "otp send to email" }

***Step 2***
> [POST]     http://backend:4000/api/verify/register

JSON: **email**="String" & **otp**="String"
* otp can be found in "verify" ->  "register" of mongodb

Response :-

    { "success":  true, "data":  { session_id: "<id>", email: "<email>" }


## Login Steps

***Step 1***
> [POST]     http://backend:4000/api/consumer/auth/login

JSON: **email**="String" & **pass**="String"

Response :-

    { "success":  true, "msg":  "otp send to email" }

***Step 2***
> [POST]     http://backend:4000/api/verify/login

JSON: **email**="String" & **otp**="String"
* otp can be found in "verify" ->  "login" of mongodb

Response :-

    { "success":  true, "data":  { session_id: "<id>", email: "<email>" }

