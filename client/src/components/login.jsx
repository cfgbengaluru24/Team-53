import react from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [pwd,setPwd] = useState("");
    const [phno,setPhno] = useState("");
    const [lvar,setLvar] = useState("Login");
    const [status,setStatus] = useState("");
    const navigate = useNavigate();

    async function submitForm(e){
        e.preventDefault();
        try{
            if(lvar === "Login"){
                const result = await axios.post("http://localhost:3000/login",{
                    // email:email,
                    username:username,
                    password:pwd,
                    // phno:phno
                });
                if(result.data.message === "register"){
                    setLvar("Register");
                    setStatus("User not found please register");
                }else if(result.data.message === "loggedIn"){
                    console.log(result.data.message)
                    navigate('/dash');
                }
            }else{
                const result = await axios.post("http://localhost:3000/register",{
                    email:email,
                    username:username,
                    password:pwd,
                    phno:phno
                });
                if(result.data.message === "allowed"){
                    console.log("hogya bhai ");
                    navigate('/dash');
                }
            }
        }catch(err){
            console.log(err.message);
        }
    }

    function handleEmail(e){
        const value = e.target.value;
        console.log(value);
        setEmail(value);
    }
    function handleUsername(e){
        const value = e.target.value;
        console.log(value);
        setUsername(value);
    }
    function handlePassword(e){
        const value = e.target.value;
        console.log(value);
        setPwd(value);
    }
    function handlePhone(e){
        const value = e.target.value;
        console.log(value);
        setPhno(value);
    }
    return <div className="background">
            <div className="left">
            <img src="./logo1.jpg" alt="Company Logo" className="company-logo" />
            <h1>Aspire and Glee</h1>
            </div>
            <div className="container">
                <div className="sign-in-container">
                <h2>Sign In</h2>
                <form onSubmit={submitForm}>
                    <div>
                    <label style={{marginTop:"10%"}}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsername}
                        required
                    />
                    </div>
                    {lvar === "register" && (
                        <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmail}
                            required
                        />
                        </div>
                    )}
                    {lvar === "register" && (
                        <div>
                        <label>Mobile No:</label>
                        <input
                            type="tel"
                            value={phno}
                            onChange={handlePhone}
                            required
                        />
                        </div>
                    )}   
                    <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={pwd}
                        onChange={handlePassword}
                        required
                    />
                    </div>
            <button style={{margin:"10% 0 10% 0"}} type="submit">{lvar}</button>
          </form>
        </div>
        
      </div>
    </div>


    // return <div>
    //     <form onSubmit={submitForm} style={{display:"flex", flexDirection:"column", padding:"10% 30% 0 30%"}}>
    //         <label htmlFor="username">Username</label>
    //         <input onChange={handleUsername} type="text" id='username' value={username}/>
    //         {lvar === "register" && (
    //             <>
    //                 <label htmlFor="email">Email</label>
    //                 <input onChange={handleEmail} type="email" id='email' value={email} required />
    //             </>
    //         )}
    //         <label htmlFor="password">password</label>
    //         <input onChange={handlePassword} type="text" id='password' value={pwd}/>
    //         {lvar === "register" && (
    //             <>
    //                 <label htmlFor="phno">phno</label>
    //                 <input onChange={handlePhone} type="number" id='phno' value={phno}/>
    //             </>
    //         )}
    //         <p>{status}</p>
    //         <button type='submit'>{lvar}</button>
    //     </form>
    // </div>
}

export default Login;