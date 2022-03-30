import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component{
    state  = {
        error: false,
    }

    componentDidCatch(error,errorInfo){
        this.setState({
            error: true
        });
    }

    render(){
        const {error} = this.state;

        if (error){
            return <ErrorMessage />
        } else{
            return this.props.children;
        }
    }
}

export default ErrorBoundary;