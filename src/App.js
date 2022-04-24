import './App.css'
import { useState } from 'react'
import { auth } from './firebase'
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"

function App() {

  const [number, setNumber] = useState(0)
  const [code, setCode] = useState(0)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const countryCode = 57

  function getPhoneNumber(e) {
    setNumber(`+${countryCode}${e.target.value}`)
  }

  function getCode(e) {
    setCode(e.target.value)
  }

  function getSMS() {
    if(number.length >= 12) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response)
        },
        'expired-callback': () => {}
      }, auth)
      let appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult)
        window.confirmationResult = confirmationResult;
        setShowCodeInput(true)
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  function verifyUser() {
    let confirmationResult = window.confirmationResult
    if(code.length >= 6) {
      confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        console.log('user:', user)
        setShowSuccessMsg(true)
      }).catch((error) => {
        console.log(error)
        setShowErrorMsg(true)
      });
    }
  }

  return (
    <div className="App">
      <h1>Inicio sesión con Firebase SMS</h1>

      <input onChange={getPhoneNumber} className='input' type='phone' placeholder='Telefono'/>
      <button onClick={getSMS} type='submit'>Solicitar codigo</button>
      <div id='recaptcha-container' />

      {showCodeInput ?
        <div className="code-container">
          <input onChange={getCode} className='input' type='number' placeholder='Codigo'/>
          <button onClick={verifyUser} type='submit'>Enviar codigo</button>
        </div> :
        null
      }

      {showSuccessMsg ? <h3>Has iniciado sesión con exito!</h3> : null}
      {showErrorMsg ? <h3>El codigo es incorrecto</h3> : null}
    </div>
  );
}

export default App;
