import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers';
import App from './App';
import './index.css'
import '@ant-design/v5-patch-for-react-19';
import { AppWrapper } from "./components/common/PageMeta"; 
import { ThemeProvider } from "./context/ThemeContext.jsx";

const store = createStore(allReducers);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AppWrapper>
            <App />
          </AppWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
