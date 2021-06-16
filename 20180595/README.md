# Conquer

## Made by...

- **KAIST ID**: 20180595
- **Name**: Seokhun Jeong
- **Email**: kunjeong99@naver.com (main) / sraccoon@kaist.ac.kr (sub)

## Index of content

- [Overview](#overview)
  - [Project Description](#project-description)
  - [How to Run](#how-to-run)
- [Detailed Description](#detailed-description)
  - [Features](#features)
    - [0. Dev Features](#0-dev-features)
    - [1. The Map](#1-the-map)
    - [2. The Inspector](#2-the-inspector)
    - [3. Attention to Detail](#3-attention-to-detail)
  - [Code Structure](#code-structure)
    - [0. General Structure](#0-general-structure)
    - [1. `components`](#1-components)
    - [2. `pages`](#2-pages)
    - [3. `stores`](#3-stores)
    - [4. `server`](#4-server)
    - [5. `public`](#5-public)
- [Resources](#resources)
- [Credits](#credits)
- [License](#license)

## Overview

### Project Description

**Conquer** is a visual todo app that combines a simple to-do list with beautiful buildings and interactive features that make it a lot of fun to get things done. It also features a 2.5d map that helps you navigate, group and view your to-dos with ease. Conquer is built mainly with Next, React, Typescript, MaterialUI, Mobx, GSAP, and Mongoose.

### How to Run

1.  To run the webpage, navigate to the 'src' directory,

```shell
#install dependencies
yarn
#build project
yarn build
#run node
yarn start
```

2. To run the server, open a new Terminal, and:

```shell
cd server
yarn
yarn start
```

3. Open [localhost](http://localhost:80) to see the webpage!

## Detailed description

### Features

**Conquer** gives variation to the traditional to-do list in a game-like approach.

The UI is divided into two parts: the map and the inspector.
(The UI is responsive. Resize your window to confirm. Not that nice for small screens.)

#### **0. Dev Features**

Some parts of the UI are only for testing the features, and aren't meant to be included if this is ever released.

- The **Reset** button is a hard reset, erasing all cells and todos and starting with only one cell. _Click only when you really want to start over, and always hard-refresh after pressing Reset._ Without hard-refresh, you might encounter more bugs.
- The **Get** button fetches cells and todos from the server. Normally, clicking this button should not do anything. If clicking the button changes something while the server is functioning normally, please let me know since this indicates a bug.
- In the timer, the **Six seconds** option is included to reduce time when testing features.

#### **1. The Map**

On the map, you can do the following:

- _Select_ a cell, and the Inspector will show available information & interactions. The map will also automatically pan to center the cell.
- _Hover_ over todo cells to peek the todo name, and over cells around the map to see whether they can be added.
- _Click_ where there aren't any cells to show all todos (_List Mode_)
- _Drag_ where there aren't any cells to _pan_ the map.

Also, there are three icons on the top right, which I call "Map Controls"

You can do the following within Map Controls:

- Click **"+/-"** to increase/decrease cell size.
- Click the **edit** icon to go into _Edit Mode_.
- Click the **done** icon to end Edit Mode.

In Edit Mode, you can re-arrange items on you map.
Specifically, you can:

- Click on a target cell to _highlight_ it.
- Click on a destination cell to _move_ the highlighted cell to.
- Click where there aren't any cells to _deselect_, allowing you to _re-select_ and edit your map multiple times.

#### **2. The Inspector**

The inspector UI presents information and interactions relevant to the mode you are in.

When you _select_ a cell on the map (_Select Mode_):

- If it's a **Grass Cell**, you can _add_ a todo.
  - Clicking outside the Inspector cancels the action.
- If it's a **Todo Cell**, you can _complete_ / _edit_ the todo.
  - Clicking where there aren't any cells cancels the action.
- If it's an **Add Cell**, you can _start_ a timer (enters _Focus Mode_).

There are views for other modes as well:

- In _Focus Mode_, see the remaining time and _cancel_ the timer.
- In _Edit Mode_, see instructions on how to edit the map.
- In _List Mode_, see the full list of todos and _select_ / _complete_ / _edit_ them quickly.

#### **3. Attention to detail.**

There are some details that aren't "features" but required further engineering to improve the usability and user experience.

- Clicking on an item in _List Mode_ automatically pans to the selected todo.
- Clicking the **edit** icon next to a todo in _List Mode_ automatically pans to the selected todo _and_ enters edit mode for the todo.
- When a timer completes, the map pans to center the newly added cell.
- _Completing_ / _uncompleting_ a todo is animated
- Clicking another todo while _editing_ a todo lets you keep editing.

### Code Structure

Here is the total structure of files that I created/modified for the project. I intentionally excluded `node_modules`, `package.json` and `yarn` files which are automatically generated by the package manager.

Folder structure was generated using the `tree` command.

```shell
.
├── components
│   ├── Inspector.tsx
│   ├── Map.tsx
│   ├── MapControls.tsx
│   ├── StoreProvider.tsx
│   ├── index.tsx
│   ├── isometricGrid
│   │   ├── CellView.tsx
│   │   ├── IsometricGrid.tsx
│   │   ├── cells
│   │   │   ├── AddCell.tsx
│   │   │   ├── GrassCell.tsx
│   │   │   ├── Rhombus.tsx
│   │   │   ├── TimerCell.tsx
│   │   │   ├── TodoCell.tsx
│   │   │   └── index.tsx
│   │   └── index.tsx
│   └── views
│       ├── AddingTimerView.tsx
│       ├── AddingTodoView.tsx
│       ├── EditView.tsx
│       ├── FocusView.tsx
│       ├── ListView.tsx
│       ├── SelectedView.tsx
│       ├── index.tsx
│       └── selectedViews
│           ├── GrassSelectedView.tsx
│           ├── TodoSelectedView.tsx
│           └── index.tsx
├── constants.js
├── contexts
│   └── index.tsx
├── hooks
│   ├── index.tsx
│   └── useStores.tsx
├── next.config.js
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── public
│   ├── tower-blue-completed.png
│   ├── tower-blue-dark.png
│   ├── tower-blue.png
│   ├── tower-dark-blue-completed.png
│   ├── tower-dark-blue.png
│   ├── tower-dark-red-completed.png
│   ├── tower-dark-red.png
│   ├── tower-red-completed.png
│   └── tower-red.png
├── server
│   ├── api
│   │   ├── controllers
│   │   │   ├── cellController.js
│   │   │   └── todoController.js
│   │   ├── models
│   │   │   ├── cellModel.js
│   │   │   └── todoModel.js
│   │   └── routers
│   │       ├── cellRouter.js
│   │       └── todoRouter.js
│   ├── package.json
│   ├── server.js
│   └── yarn.lock
├── stores
│   ├── CellStore.tsx
│   ├── RootStore.tsx
│   ├── TodoStore.tsx
│   ├── UIStore.tsx
│   └── index.tsx
├── theme.js
├── tsconfig.json
```

#### **0. General Structure**

You can see that every part is organized in a sensible manner.

All the front-end folders have one `index` file. In `pages`, this corresponds to the main page of the app. In other folders, the `index` file `import`s everything inside the folder that is also needed outside and re-exports them, allowing me to later do multiple imports from that file. For instance, `components/isometricGrid/cells/index` exports `AddCell`, `GrassCell`, `TimerCell`, `TodoCell`, allowing me to do the following in `components/isometricGrid/CellView`:

```js
import { AddCell, TodoCell, GrassCell, TimerCell } from "./cells";
//instead of using default exports within each subfile, costing four lines:
import AddCell from "./cells/AddCell";
import TodoCell from "./cells/TodoCell";
import GrassCell from "./cells/GrassCell";
import TimerCell from "./cells/TimerCell";
```

I did this because many libraries like MaterialUI seemed to do this, and it allowed for 1) more compact syntax, 2) deciding which components to expose to outside folders in an API-like manner, and 3) Typescript auto-suggestions.

In the following sections I will describe each of the sub-folders in detail.

#### **1. `components`**

Largest part of my code. This is where each part of the UI is divided and built and then put together to create the resulting UI. While there are too many files to explain all, here's the basic

- See `components/isometricGrid/cells/Rhombus`, `TodoCell` for examples of complex custom CSS styling using **makeStyles**.

- See `components/isometricGrid/cells/TimerCell` for an **Animejs** example (this is the only part where Animejs is used)

- See `components/views/AddingTodoView` for an example of extensive use of **MaterialUI** components.

- See `components/views/AddingTimerView` for an example of using **Mobx stores** within components

#### **2. `pages`**

This is a part of the basic **Nextjs** folder structure. files in `pages` are actual pages that I can navigate to composed with components in the `components` directory. So, `pages/index` is the root page you see on [http://localhost:80]. Since this a single-page-app, there is only one page. The `_app` and `_document` files correspond to the entire app, where I can inject the store, theme, cssbaseline, and fetch server-side props to not break the styling.

Looking at `pages/index`, you can see the UI is very simply composed with the three components: `Inspector`, `Map` and `MapControls` which represent what you see on the screen.

#### **3. `stores`**

Here are the Mobx stores. The stores contain most of the complex logic, communication with server, computations, and animations. There are four stores: `CellStore` to store the cells and perform actions and calculations on cells, `TodoStore` for todos, `UIStore` for ui states like pan, mode, and selection, and `RootStore` to link all three stores to help them communicate.

`stores/CellStore` shows that the class fields directly represent the model structure of our app.

```js
export enum CellType {
  Grass = "grass",
  Todo = "todo",
  Timer = "timer",
  Add = "add",
}

export class Cell {
  store: CellStore;
  id: string = null;
  hasElement: string = null; // id of the Todo linked to the cell
  @observable type: CellType;
  @observable i: number;
  @observable j: number;
  //...
  @computed get x() {
    return this.i - this.j;
  }

  @computed get y() {
    //layer
    return this.i + this.j;
  }
}

export class CellStore {
  rootStore: RootStore;
  @observable cells: Cell[] = [];
}
```

Since this model is identical to the server, one could argue that everything can be stored in the server without the need for a store. To make separation of concerns clear, I divided things to be stored in the server (persistent data) and things to be stored in the stores (temporary data). Nothing in `UIStore` is stored in the server, as it is temporary state.

Another good example is `Todo` in `stores/TodoStore`. Here we have two extra properties `completedOpacity` and `incompleteOpacity` that are used in `components/isometricGrid/cells/TodoCell` to animate the completion flag. These two properties are only used when animating, and are not stored in the server.

```js
export class Todo {
  store: TodoStore;
  id: string = null;
  onCell: string = null;
  @observable completed: boolean = false;
  @observable name: string;
  @observable imageName: string = null;

  @observable completedOpacity: number = 0;
  @observable incompleteOpacity: number = 1;
}
```

Enums in Typescript are particular for defining type constraints (the main reason I decided to learn and use Typescript). The below type defines the various possible modes in the UI.

```js
// stores/UIStore.tsx
export enum Mode {
  List,
  Selected,
  Focus,
  AddingTodo,
  AddingTimer,
  Edit,
}
```

Other interesting code points:

- See function `setComplete` in `stores/TodoStore` and `panToCell` in `stores/UIStore` to take a look at how I used `GSAP` to animate store properties.
- See `Cell.modify` and `Cell.modifyToSever` in `stores/CellStore` where I perform the same modification in temporary and persistent manners respectively.
- See `sortedCells` in `stores/CellStore` for an example of computed properties, where I sort the cells based on `y` position so that cells in the back don't hide cells in the front.
- See `getCells` in `stores/CellStore` for an example of using **Axios** to fetch data from the server.

To use Mobx with React, we must make use of the `React.useContext` hook and provide the stores using a custom hook. The `hooks` & `contexts` directories contain boilerplate code for this purpose.

#### **4. `server`**

Here the server code is located, contained in a separate node project. I have used the (controller, router, model) approach for two models: `cells` and `todos`. You can see how the models are near-identical to the store model. `Cell.y` in the store is identical to `layer` here, which are not synced with each other as they are computed properties.

```js
// api/models/cellModel.js
const CellSchema = Schema({
  _id: String,
  i: Number,
  j: Number,
  hasElement: String,
  layer: {
    type: Number,
    default: function () {
      return this.i + this.j;
    },
  },
  type: {
    type: String,
    enum: ["grass", "todo", "timer", "add"],
    default: "grass",
  },
});
```

#### **5. `public`**

Here the images are stored, which are used as the root directory in `Image` component from `next/image`.

## Resources

[Demo Video](https://drive.google.com/file/d/1LNi7k3kr6R17zag4rWgy-LLnjCgV6ki-/view?usp=sharing)
In the demo video, I walk through all the major features in this order:

1. my page loads all data instantly from server
2. adding timer: I can hover to reveal addable cells. I can select time. I can also cancel the timer, which doesn't add the cell. When a timer is running, I am not allowed to do anything else. I can pan around, and when the timer finishes it pans to th center.
3. creating, completing, editing todos: I can select a grass cell to add a todo. I can set name and image. I can complete todos by selecting them, which is animated. I can edit a todo - I can change the selected cell while editing as well.
4. I can pan the map, I can zoom in/out, and I can also enter edit mode. Here, I can rearrange the cells on the map, and click done when I'm satisfied.
5. I can interact with the map via the list view in the inspector. Here I can quickly complete multiple todos with animations, and select a cell to pan to it. I can also enter edit mode directly.

## Credits

I dived deep into the official documentation for each of the libraries I used.

- [Mobx (official)](https://mobx.js.org/README.html)
- [Mobx + React (deprecated)](https://mobx-react.js.org)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Nextjs](https://nextjs.org/docs/getting-started)
- [GSAP](https://greensock.com/learning/)
- [ReactJS](https://reactjs.org/docs/getting-started.html)
- [Axios](https://axios-http.com/docs/intro)
- [MaterialUI](https://material-ui.com)
- [mongoDB](http://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)

Among these, the major code sources are:

**1) Mobx + React** which (though deprecated) contains the best examples for using Mobx with React Hooks in an actual project. You can see some similar code in `hooks/useStores`, `contexts/index`, and `components/StoreProvider` which are boilerplate code to connect Mobx stores and React.

**2) MaterialUI** from which I copied a couple of layout examples. Most of the example demos in their site use `makeStyles` which is pretty neat for styling. The views made earlier (`components/views/FocusView`, to name one) contain code similar to them, as later on I started using `Box` and inline styling

Also, `pages/_document` is copied from a [custom `_document` file](https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js) provided by Material-UI.

I also searched and saw many Q&As in Stack Overflow, which are too numerous to list but I can 95% guarantee that didn't copy & paste code from any of them.

I also looked at [mobx + react example project](https://byseop.netlify.app/mobx-tutorial01/) for examples about Mobx being used with Axios.

I originally started with some boilerplate code from [create-next-app with mobx-react-lite](https://github.com/umarmw/nextjs-with-mobx-lite), but in the end nearly none of this code remains in the final project.

## License

[The GPLv3 License](https://choosealicense.com/licenses/gpl-3.0/)
