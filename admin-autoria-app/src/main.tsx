import { store } from "app/store.ts";
import "css/index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "utils/contexts/ThemeContext.tsx";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <ThemeProvider>
        <App />
        <ToastContainer />
      </ThemeProvider>
    </Router>
  </Provider>,
);
