import {Link} from "react-router-dom"





const MainPage= () => {
    const paramObj = { 
        pathname: "aipage", 
        param1: "Par1" 
      };
    const paramObjPlay = { 
        pathname: "playPage", 
        param1: "Par1" 
      };
    const paramObjParams = { 
        pathname: "paramsPage", 
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
            


            <p>
            <Link to={paramObjPlay} aaa={paramObjPlay} bbb='dasad'>
            press me for 'play'
            </Link>
            </p>

            <p>
            <Link to={paramObjParams} aaa={123} bbb='dasad'>
            press me for params
            </Link>
            </p>


    </div>)

} 
export default MainPage;