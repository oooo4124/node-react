import React, { useState } from "react"
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_action/user_action'
import { useNavigate} from "react-router-dom";

function LoginPage(){
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault(); // submit 할 때마다 refresh되지 않게한다.
        

        let body = {
            email: Email,
            password: Password
        }


        //redux 사용
        dispatch(loginUser(body))
        .then(response=>{
            if(response.payload.loginSuccess){
                nav('/') // 페이지 이동 react-router-dom v6부터 useNavigate이용
            }else{
                alert('Error')
            }
        })

        
    }

    return(
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width:'100%', height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br/>
                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    )
}

export default LoginPage