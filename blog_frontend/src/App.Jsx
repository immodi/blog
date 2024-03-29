import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/common/NavBar'
import Footer from './components/common/Footer'
import Script from './components/common/Script'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import MakePost from './routes/MakePost'
import ErrorPage from './routes/ErrorPage' 
import Home from './routes/Home';
import About from './routes/About';
import Post from './routes/Post'
import Posts from './routes/Posts';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import { useAuthentication } from './hooks/useAuthentication.js';
import { PrimeReactProvider } from 'primereact/api';
import { Messages } from 'primereact/messages';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import useMessage from './hooks/useMessage.js';
import { useCookies } from 'react-cookie';

export default function App() {
    const url = "https://dbackend.alwaysdata.net/"
    const [disableNav, setDisableNav] = useState(false)
    const [mes, messagesObject, setMessagesObject] = useMessage()
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [authenticated, isAdmin, token, credentials, setCredentials] = useAuthentication(url, setMessagesObject, cookies, setCookie, removeCookie)
    

    return (
        <BrowserRouter>
            <PrimeReactProvider>
                {!disableNav ? <NavBar authenticated={authenticated} isAdmin={isAdmin} setCredentials={setCredentials}/> : <></>} 
                <Script />
                <div className='messages-container'>
                    <Messages ref={mes} className="messages-custom"/>
                </div>
                <Routes>
                    <Route path='/' element={<Home setDisableNav={setDisableNav} url={url} />} />
                    <Route path='post/:id' element={<Post url={url} setDisableNav={setDisableNav} userName={credentials.userName} />} />
                    <Route path='posts' element={<Posts setDisableNav={setDisableNav} url={url}/>} />
                    <Route path='make-post' element={<MakePost 
                        isAdmin={isAdmin}
                        setDisableNav={setDisableNav}
                        userName={credentials.userName}
                        url={url}
                        token={token}    
                    /> } />
                    <Route path='about' element={<About setDisableNav={setDisableNav}/>} />
                    <Route path="login" element={<Login setCredentials={setCredentials} setDisableNav={setDisableNav} />} />
                    <Route path="signup" element={<SignUp url={url} setDisableNav={setDisableNav} setCredentials={setCredentials}/>} />
                    <Route path="*" element={<ErrorPage setDisableNav={setDisableNav} />} />
                </Routes>
                {!disableNav ? <Footer /> : <></>} 
            </PrimeReactProvider>
        </BrowserRouter>
    )
}