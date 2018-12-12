import React from 'react';
export class PromptBox extends React.Component{
    render(){
        return(
            <div style={{
                position:"fixed",
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                background:'rgba(0,0,0,0.75)',
                color:'#fff',
                padding:'.2rem .4rem',
                borderRadius:'.1rem',
                zIndex:99,
                whiteSpace:"nowrap"
            }}>{this.props.text}</div>
        )
    }
} 