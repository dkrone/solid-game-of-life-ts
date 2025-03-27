import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ReactRenderer from "./renderers/ReactRenderer";

ReactDOM.render(
	<React.StrictMode>
		<ReactRenderer />
	</React.StrictMode>,
	document.getElementById("app")
);


