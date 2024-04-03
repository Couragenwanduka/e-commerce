import './App.css';
import LOGO from './components/Logo'
import HEADER from './components/Header'
import FOOTER from './components/Footer'
import LOGOINFORM from './components/LoginForm'

function Login(){
    return(
        <div>
            <LOGO />
            {/* <HEADER /> */}
            <LOGOINFORM />
            <FOOTER />
        </div>
    )
}

export default Login;