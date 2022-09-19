# React + Redux list of posts

## Main functionality:
 - The main window has `selector` with list of `users`. The list of users is implemented through an AJAX request to the server.
 - After the user is selected, the `table of posts` of the selected user is displayed below. Each post has the ability to open it in detail with the `"Open"` button. Then a `sidebar` opens with detailed information on the selected post and a `list of comments` from all users.
 - The list of comments has the ability to send an email to the selected user (link to the mail in the name), the body of the comment and the button to `delete the comment`.
 - Below the list of comments is the button `"Write a comment"`, which opens a new `form`, where there are two inputs (name and e-mail) and a text form for commenting. Two buttons for interaction with the form are also implemented - `add a comment` and `clear the form`.

## Technical specifications:
 - The application was created using the `React` library (functional components) + `TypeScript`.
 - All states except for the submit form are stored using the `Redux toolkit` and asynchronous code is executed through `Redux Thunk`.
  - The design is made using `Bulma's` CSS framework.
  - Requests to the server are made using `Fetch` and using the `Axios` library.

## [DEMO LINK](https://illnino380.github.io/react_redux-list-of-posts/)
