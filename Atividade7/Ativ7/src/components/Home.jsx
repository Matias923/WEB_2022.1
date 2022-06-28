import React, { useState } from "react";
//import { Toast, ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import FirebaseUserService from "../services/FirebaseUserService";
import FirebaseContext from "../utils/FirebaseContext";

const HomePage = ({setLogged,setShowToast,setToast}) =>
    <FirebaseContext.Consumer>
        {(firebase) => <Home 
                            firebase={firebase} 
                            setLogged={setLogged} 
                            setShowToast={setShowToast}
                            setToast={setToast}/>}
    </FirebaseContext.Consumer>

function Home({firebase,setLogged,setShowToast,setToast}) {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [validate, setValidate] = useState({login:'',password:''})

    const navigate = useNavigate()

    const validateFields = () => {
        let res = true //os campos estão ok!
        setValidate({login:'',password:''})
        if(login === '' || password === ''){
            res = false

            setToast({header:'Atenção!',body:'Preencha todas os campos',bg:'warning'})
            setShowToast(true)
            
            let validateObj = {login:'',password:''}
            if(login === '') validateObj.login = 'is-invalid'
            if(password === '') validateObj.password = 'is-invalid'
            setValidate(validateObj)
        }
        return res
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!validateFields()) return
        setLoading(true)

        //console.log(login)
        //console.log(password)
        FirebaseUserService.login(
            firebase.getAuthentication(),
            login,
            password,
            (user) => {
                if (user != null) {
                    //console.log(user.email)
                    setLoading(false)
                    firebase.setUser(user)
                    setLogged(true)
                    navigate('/listStudent')
                } else {
                    //alert('Usuário e/ou senha incorretos!')
                    setLoading(false)
                    setToast({header:'Erro!',body:'Login e/ou Senha incorretos',bg:'danger'})
                    setShowToast(true)
                }
            }
        )
    }

    const renderSubmitButton = () => {
        if (loading) {
            return (
                <div style={{ paddingTop: 20 }}>
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span style={{ marginLeft: 10 }}>Carregando...</span>
                    </button>
                </div>
            )
        }
        return (
            <>
                <div className="form-group" style={{ paddingTop: 20 }}>
                    <input type="submit" value="Efetuar Login" className="btn btn-primary" />
                </div>
            </>
        )
    }

    

    return (
        <div className="content-login" style={{ marginTop: 50 }}>
            
            <main style={{ width: '40%' }}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Login* </label>
                        <input type="text"
                            className={`form-control ${validate.login}`}
                            value={(login == null || login === undefined) ? "" : login}
                            name="login"
                            onChange={(event) => { setLogin(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Senha* </label>
                        <input type="password"
                            className={`form-control ${validate.password}`}
                            value={password ?? ""}
                            name="password"
                            onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    {renderSubmitButton()}
                </form>
            </main>
            <nav>
                <Link to="/about">About</Link>
            </nav>
            <nav>
                <Link to="/signup">Cadastre-se</Link>
            </nav>
        </div>
    );
}

export default HomePage