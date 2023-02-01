import { useEffect, useState, useRef, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
//import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider"; //It contains the global data



const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthForm = () => {
    //To retrieve the global data and set it to a variable
    const { setAuth } = useContext(AuthContext)
    const location = useLocation()
    const condition = location.pathname === '/login' 
    const navigate = useNavigate();
    //To check if the location variable has a from state - This is set in the RequireAuth
    //If from state is missing we set the default to "/"
    const from = location.state?.from?.pathname || "/"
    
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false) //Tied with whether the userName validates or not
    const [userFocus, setUserFocus] = useState(false) //Tied with whether we are focused into the user filed or not

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false) 
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false) 
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false) 
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    // const [reminder, setReminder] = useState()

    // //Set Default vaule of Reminder
    // useEffect(()=>{
    //     setReminder(JSON.parse(localStorage.getItem("reminder")) || false)
    // },[])

    useEffect(() => {
        userRef.current.focus(); // Note for this to work userRef must be used inside the html elements
        //Note that the above code functions like e.target.value = It gets the current value of the the user input
        //In the above code, useRef is used to access a specific DOM element
    }, [])

    //To validate the user name - not that the user state is in the dependacy
    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result)
    }, [user]);

    //To validate the EMAIL
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result)
    }, [email])

    //To validate the password
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result)
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])
    

    useEffect(() => {
      setErrMsg('')
    }, [user, pwd, matchPwd, email])

    const register = async()=>{
        const res = await fetch('/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({user, pwd, email})
        })

        return res
    }

    const login = async()=>{
        const res = await fetch('/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({user, pwd, email})
        })

        return res
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        //If button is enabled with JS hack
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if(!v1 || !v2){
            setErrMsg("Invalid Entry")
            return;
        }
        const res = condition ?await login() : await register() 
        var res_data = await res.json() || ""

        if (res.status === 409){
            //setErrMsg((await res.json()).msg)
            setErrMsg(res_data.msg)
        } else if(res.status === 500) {
            setErrMsg('No Server Response')
        } else {
            //Passing the user, pwd to global scope on login in
            const auth_data = {user, roles:res_data.roles, access_token:res_data.access_token, refresh_token:res_data.refresh_token}
            condition && setAuth(auth_data)
            if(localStorage.getItem("reminder")){
                localStorage.setItem("auth", JSON.stringify(auth_data)) 
            }else{
                console.log("Session will be deleted on refresh")
            }

            //Clear input field
            setEmail('')
            setPwd('')
            setUser('') 

            navigate(from, {replace: true})
        }
    } 

    const toggleReminder = (reminder)=> {
        // setReminder(reminder)
        localStorage.setItem("reminder", JSON.stringify(reminder))
    }

  return (
    <div className="tab-content">
        <p ref={errRef} style={errMsg ? errmsg : offscreen }>{errMsg}</p>
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
            <form onSubmit={handleSubmit}>
                {condition ? 
                    (<p className="text-center mb-3">Sign in with:</p>) :       
                    (<p className="text-center mb-3">Sign up with:</p>)
                }

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="userName">
                        Username:
                        {!condition && (
                        <>
                            <FontAwesomeIcon icon={faCheck}  style={validName ? valid : hide} />
                            <FontAwesomeIcon icon={faTimes} style={validName || !user ? hide :  invalid } />
                        </>)}
                        
                    </label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="userName" 
                        ref={userRef}
                        // autoComplete="off"
                        onChange={(e)=>setUser(e.target.value)}
                        onFocus = {() => setUserFocus(true)}
                        onBlur = {() => setUserFocus(false)}                                                                                                                                                                                                                                                                                                    
                        required
                    />
                    {!condition && (
                    <p id="uidnote" style={userFocus && user && !validName ? instructions : offscreen}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    )}
                    
                    
                </div>

                {!condition && (
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck}  style={validEmail ? valid : hide} />
                            <FontAwesomeIcon icon={faTimes} style={validEmail || !email ? hide :  invalid } />
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control" 
                            name="email" 
                            placeholder="Email Address" 
                            // autoComplete="off"
                            onChange={(e)=>setEmail(e.target.value)}
                            onFocus = {() => setEmailFocus(true)}
                            onBlur = {() => setEmailFocus(false)}
                            required
                        />
                        <p id="uidnote" style={emailFocus && user && !validName ? instructions : offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be of valid email format.
                        </p>
                    </div>
                )}
        
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                        Password:
                        {!condition && (
                        <>
                            <FontAwesomeIcon icon={faCheck}  style={validPwd ? valid : hide} />
                            <FontAwesomeIcon icon={faTimes} style={validPwd || !pwd ? hide :  invalid } />   
                        </>)}
                        
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-control" 
                        name="password" 
                        onChange={(e)=>setPwd(e.target.value)}
                        onFocus = {() => setPwdFocus(true)}
                        onBlur = {() => setPwdFocus(false)}
                        required
                    />
                    {!condition && (
                        <p id="pwdnote" style={pwdFocus && !validPwd ? instructions : offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span>! @ # $ % </span>
                        </p>
                    )}
                    
                </div>

                {!condition && (
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="registerRepeatPassword">
                            Confirm password:
                            <FontAwesomeIcon icon={faCheck}  style={validMatch && matchPwd ? valid : hide} />
                            <FontAwesomeIcon icon={faTimes} style={validMatch || !matchPwd ? hide :  invalid } />
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            className="form-control" 
                            name="confirmation" 
                            placeholder="Confirm Password" 
                            onChange={(e)=>setMatchPwd(e.target.value)}
                            onFocus = {() => setMatchFocus(true)}
                            onBlur = {() => setMatchFocus(false)}
                            required
                        /> 
                        <p id="pwdnote" style={matchFocus && !validMatch ? instructions : offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field
                        </p>
                    </div>
                )}
                {/* Below is code for Remember me */}
                <div className="form-outline mb-4 col-sm-4 ">
                    <div className="form-check mb-4">
                        <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="checkBox"
                            onChange={(e) => toggleReminder(e.target.checked)} 
                        />  
                    </div>
                </div> 

                {/* Submit button  */}
                <input 
                    type="submit"
                    className="btn btn-primary btn-block mb-4" 
                    style={{width: "100%"}}
                    value={`Sign ${condition? "in" : "up"}`} 
                    disabled={!validName || (!condition && !validEmail) || !validPwd || (!condition && !validMatch) ? true : false}
                />
                {/* Register buttons */}
                {condition && (
                    <div className="text-center">
                        <p>Not a member? <Link to="/register" className="reg-link">Register</Link></p>
                    </div>
                )}
                
            </form> 
        </div>
    </div>
  )
}

//Styling
const valid = {
    color: "limegreen",
    marginLeft: "0.25rem",
}

const instructions = {
    fontSize: '0.75rem',
    borderRadius: "0.5rem",
    background: "#000",
    color: "#fff",
    padding: "0.25rem",
    position: "relative",
    bottom: "-10px",
}

const offscreen =  {
    position: 'absolute',
    left: "-9999px",
}

const hide = {
    display: "none",
}

const invalid = {
    color: "red",
    marginLeft: "0.25rem",
}

const errmsg = {
    backgroundColor: "lightpink",
    color: "firebrick",
    fontWeight: "bold",
    padding: "0.5rem",
    marginBottom: "0.5rem",
}

// const line = {
//     display: "inline-block"
// }

export default AuthForm