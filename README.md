# Overview
This is just a small and simple application that helps you count calories. I initially created it based on an example application I was following in this training program: [Functional Programming for Beginners with JavaScript](https://www.knowthen.com/functional-programming-for-beginners-with-javascript), provided by [KnowThen](https://www.knowthen.com/) all credit goes to @knowthen for the inspiration.
`
<img src="/docs/assets/images/in-action.gif" />

Try it out here: https://calorie-counter-6d948.web.app/

# Design
I was really interested in just learning how I could pair functional programming and [React](https://reactjs.org/). This was a good excuse to learn various techniques, some I liked and others not so much. One thing I really enjoyed to use in this application was the functional library: [Ramda](https://ramdajs.com/). Ramda was a joy to work with. The documentation is very well done, I especially enjoyed the [Thinking in Ramda](https://randycoulman.com/blog/categories/thinking-in-ramda/) series as it helped me apply some of the principles I was learning in James' course.

## High Level

<img src="/docs/assets/images/high-level-design.jpg" width="300" height="401" />

## Components

### Calorie Counter
Besides the [App](src/App.js) component the [CalorieCounter](src/containers/CalorieCounter.js) component is the only one I would consider a container. It is a stateful functional component using hooks. The state it contains are the meals of course, and the meal the user would like to edit. This component contains the handlers for some of the actions a user can perform within the application:
* Save Meal *add/update*
* Delete Meal
* Cancel Add or Edit Meal

### MealEntry
This component has three different *modes*: initial view, add, or edit. This component and the `FormEntry` both have state. The [MealEntry](src/components/Meal/MealEntry.js) component tracks whether or not to display the MealEntry form and FormEntry just tracks the inputs within the form itself. 

Important thing about this component is how it handles editing meals. When a meal is passed to this component via a `meal` prop, it will switch to edit mode by prefilling the form and displaying itself. Within this component there are these children components:
* `NoAction` *initial state, just displays a button Add Meal*
* `FormEntry`

### MealList
This component isn't stateful, the meals provided to it are displayed. The edit and delete action handler references are passed to this component to be delegated. Within this component there are these children:
* `ZeroMeals`
* `ShowMealItems`

## Look & Feel
This app is using a very minimal amount of Bootstrap. It is responsive having breakpoints within the CalorieCounter component's layout and it uses CSS Grid layout.

# Running

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
