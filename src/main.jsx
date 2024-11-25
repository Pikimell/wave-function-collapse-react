import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import './style/index.css';
import './style/variables.css';
import { ConfigProvider, theme } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: 'rgb(0, 166, 255)',
              borderRadius: 2,
              colorBgContainer: '#1c1f24',
              colorBgBase: '#1c1f24',
              colorBgLayout: '#1c1f24',
              colorInfoBg: '#1c1f24',
            },
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
