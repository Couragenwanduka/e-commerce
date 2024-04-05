import { BrowserRouter , Routes, Route} from "react-router-dom";
// import NoPage from "./pages/NoPage";
import Signup from './pages/signup.jsx';
import App from './pages/App.jsx';
import Signin from './pages/Login.jsx'
import Lp from "./pages/LandingPage.jsx";

 function ROUTER() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" >
                <Route path="/" element={<Lp/>}/>
                 <Route path="/Loggedin" element={<App/>}/>
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/sign-in" element={<Signin />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}
 
export default ROUTER;