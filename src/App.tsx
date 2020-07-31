import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PTMContainer from "./components/PTMContainer/PTMContainer";

const App: React.FC = () => {
    return (
        <div className='App'>
            <PTMContainer />
        </div>
    );
};

export default App;
