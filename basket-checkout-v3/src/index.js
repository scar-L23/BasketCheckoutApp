import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './utils/configureStore';
import App from './screens/App';
import "./assets/stylesheets/root.styled.css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
