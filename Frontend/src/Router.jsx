import { BrowserRouter , Routes, Route} from "react-router-dom";
// import NoPage from "./pages/NoPage";
import Signup from './pages/signup.jsx';
import App from './pages/App.jsx';
import Signin from './pages/Login.jsx'
import Lp from "./pages/LandingPage.jsx";
import EMAILVERIFICATION from "./pages/EmailVerification.jsx";
import OTPVERIFICATION from "./pages/OtpVerification.jsx";
import SELLERPAGE from "./pages/SellerPage.jsx";
import ADMINPAGE from "./pages/AdminP.jsx";
import PRODUCT from "./pages/products.jsx";
import ORDERPAGE from "./pages/showorder.jsx";
import UserDisplay from './pages/UserAccountPage.jsx';

 function ROUTER() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" >
                <Route path="/" element={<Lp/>}/>
                 <Route path="/Loggedin" element={<App/>}/>
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/email-verification" element={<EMAILVERIFICATION />} />
                <Route path="/otp-verification" element={<OTPVERIFICATION />} />
                <Route path="/seller-Registration" element={<SELLERPAGE />} />
                <Route path="/admin" element={<ADMINPAGE />} />
                <Route path="/product" element={<PRODUCT />} />
                <Route path="/order" element={<ORDERPAGE />} />
                <Route path="/UserDisplay" element={<UserDisplay />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}
 
export default ROUTER;