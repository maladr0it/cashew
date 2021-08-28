import ReactDOM from "react-dom";

import "./reset.css";
import { App } from "./App";
import type * as MocksModule from "./mocks";

if (process.env.NODE_ENV === "development") {
  const { worker }: typeof MocksModule = require("./mocks");
  worker.start();
}

ReactDOM.render(<App />, document.getElementById("root"));
