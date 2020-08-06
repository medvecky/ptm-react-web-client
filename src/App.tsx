import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PTMContainer from "./components/PTMContainer/PTMContainer";
import {HashRouter} from "react-router-dom";

const App: React.FC = () => {
    return (
        <HashRouter>
            <div className='App'>
                <PTMContainer/>
            </div>
        </HashRouter>
    );
};

export default App;
