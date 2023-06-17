import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import App from '../App';
import Login from './Login';
import Create from './Create';
import NotFound from './NotFound';
import '../App.css';
import Admin from '../FrontEnd/Admin';


function Browsing(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/app/:passId" element={<App/>} >
                        <Route path="/app/:passId/admin" element={<Admin/>} />
                    </Route>
                    <Route path="/create" element={<Create/>} />
                    <Route path='*' element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Browsing;