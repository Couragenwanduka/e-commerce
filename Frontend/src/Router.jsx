import { BrowserRouter , Routes, Route} from "react-router-dom";
// import NoPage from "./pages/NoPage";
import Signup from './signup.jsx';
import App from './App.jsx';
import Login from './Login.jsx';
import Lp from "./LandingPage.jsx";

 function Main() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" >
                <Route path="/" element={<Lp/>}/>
                 <Route path="/Loggedin" element={<App/>}/>
                <Route path="sign-up" element={<Signup />} />
                <Route path="sign-in" element={<Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}
 
export default Main;