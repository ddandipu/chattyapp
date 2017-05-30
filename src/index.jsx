// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import ChatBar from './ChatBar.jsx';

ReactDOM.render(<ChatBar />, document.getElementById('foot'));
