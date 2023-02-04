import {Link} from "react-router-dom"





const MainPage= () => {
    const paramObj = { 
        pathname: "aipage", 
        param1: "Par1" 
      };

    return (<div className="title is-2"npm start>
        sdsadas
        
        <Link to="dbpage">
            <p>
            press me for db
            </p>
            </Link>
            <Link to={paramObj} aaa={paramObj} bbb='dasad'>
            press me for ai
            </Link>
    </div>)

} 
export default MainPage;