import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PTMContainer from "./components/PTMContainer/PTMContainer";
import {BrowserRouter} from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className='App'>
                <PTMContainer/>
            </div>
        </BrowserRouter>
    );
};

export default App;
