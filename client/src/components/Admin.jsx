import React from "react";
import axios from 'axios';
import Student from "../components/Student";

function Admin(){

    const [pwd,setPwd] = React.useState("");
    const [selectedOption, setSelectedOption] = React.useState("");
    const [comp,setComp] = React.useState("form");

    const [store,setStore] = React.useState();
    const [requ,setRequ] = React.useState("");
    const [quant,setQuant] = React.useState();
    const [username,setUsername] = React.useState("");

    function handleChange(e){
        const value = e.target.value;
        setPwd(value);
    }

    function handleOption(e){
        const option = e.target.value;
        setSelectedOption(option);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(pwd === "Abc123" && selectedOption === "student" && username==="aspire"){
            setComp("student");
        }
        if(pwd === "Abc123" && selectedOption === "cloth" && username==="aspire"){
            setComp("cloth");
        }else{
            setPwd("Invalid Password");
        }
    }

    async function handleInvent(e){
        e.preventDefault();
        console.log(store+" "+requ);
        try{
            const response = await axios.post("http://localhost:3000/update",{
                no:store,
                requ:requ,
                quant:quant
            })
            if(response){
                alert("Inventory Updated");
            }
        }catch(err){
            console.log(err);
        }
    }

    async function sendmail(){
        try{
            const res = await axios.post("http://localhost:3000/send");
            if(res){
                alert("Mail sent");
            }
        }catch(err){
            console.log(err);
        }
    }

    function component(){
        if(comp === "form"){
            return <div className="adform">
                    <form onSubmit={handleSubmit} className="adminForm">
                        <input onChange={(e)=>{
                            const value = e.target.value;
                            setUsername(value);
                        }}type="text" placeholder="Enter your username" value={username}/>
                        <input onChange={handleChange} type="password" placeholder="Your Admin password" value={pwd}/>
                        <select id="category" value={selectedOption} onChange={handleOption}>
                            <option value="">Select an option</option>
                            <option value="student">CSR</option>
                            <option value="cloth">Cloth Bank</option>
                        </select>
                        <button>Submit</button>
                    </form>
                </div>
        }
        else if(comp === "student"){
            return <Student />;         
        }
        else{
            return <div style={{margin:"5% 10% 5% 10%"}}>
                <form className="inventform" onSubmit={handleInvent}>
                    <input onChange={(e)=>{setStore(e.target.value)}} type="number" value={store} placeholder="Enter your free storage"></input>
                    <input onChange={(e)=>{setRequ(e.target.value)}} type="text" value={requ} placeholder="Enter your Requirements"></input>
                    <input onChange={(e)=>{setQuant(e.target.value)}} type="text" value={quant} placeholder="Enter min quantity"></input>
                    <button type="submit">Update Inventory</button>
                </form>
                <div>
                    <h1 style={{marginTop:"5%"}}>Due Reminders</h1>
                    <button onClick={()=>sendmail()} className="mailsend">Send Mail</button>
                    <p>yashasvichandra84@gmail.com</p>
                    {/* <p>Nistha25gmail.com</p>
                    <p>jeevan36@gmail.com</p>
                    <p>saravana6523@gmail.com</p>
                    <p>madan7521@gmail.com</p> */}
                </div>
            </div>
        }
    }
    return <>{component()}</>;
}

export default Admin;


