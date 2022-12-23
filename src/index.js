import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from "./components/organisms/App";

// const time = "10:30:00.023"

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
const app = <App/>;
root.render(app);
