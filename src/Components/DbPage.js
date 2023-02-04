import {useNavigate} from "react-router-dom" 
import {useState, useEffect} from "react" 


const DbPage = () => {
    const navigate = useNavigate()
    const goBack = async (e) => {
        
        navigate('/')
        console.log('DbPage, wen bac to /')
    }
    console.log('DbPage rendered?')
    return (<div>
        <button onClick={goBack}> goback </button>
    </div>)

} 

export default DbPage;