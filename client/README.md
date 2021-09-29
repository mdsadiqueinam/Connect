# Getting Started with !Connect Frontend

## Tools Used

1. React: [v17.0.2](https://reactjs.org/docs/getting-started.html)

2. Material-ui: [v4.12.3](https://https://v4.mui.com/)
   
3. Material-ui-icons: [v4.11.2](https://https://v4.mui.com/)
   
4. React-router-dom: [v5.2.1](https://reacttraining.com/react-router/web/guides/quick-start)

5. apollo-upload-client: [v16.0.0](https://www.npmjs.com/package/apollo-upload-client)
  
6. apollo3-cache-persist: [v0.13.0](https://www.npmjs.com/package/apollo3-cache-persist)

7. @apollo/client: [v3.4.10](https://www.apollographql.com/docs/react/)

8. graphql: [v15.5.1](https://www.apollographql.com/docs/react/)

9. moment: [v2.29.1](https://www.npmjs.com/package/moment)

10. react-infinite-scroll-hook: [v4.0.1](https://www.npmjs.com/package/react-infinite-scroll-hook)


### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `Home Page`

The home page is the main page of the app, here the user can see the list of all his `posts` as well as all his `friends posts`

`The pagination to view posts is yet to be implemented.`

The home page is available only for logged in `users`.

The home also contains a `Create Post Card` which contains a button on click which will open a `Create Post` modal, where the `user` can create a new `post`.

### `Post`

The `user` can write anything on his post and can also add a `photo` to the post.

The `user` can also like the `post` or comment on the `post`.