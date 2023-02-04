import React from 'react'

class TodoYourComponent extends React.Component {
    constructor() {
        super();
        this.state = {count:0}
        //incr = () => {} //setState({color: "blue"});


        
    }

    arrowF = () => {
        this.setState({count: this.state.count + 1})
        this.setState({color: this.props.colorExplicit,
            textVal:this.props.textFieldVal
        }); //passing from caller
        var v = 1
    } 

    render() {
        return ( <>
            <h1 style={this.state ||this.props}> yury component count {this.state.count} </h1>
            <button onClick={this.arrowF}>increment</button>
        </>
        )
    }
}

export default TodoYourComponent;