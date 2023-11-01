import React from 'react'

export default function Alert(props) {
    const captalizeWord=()=>{
        if (props.alert && props.alert.type){
            let word=props.alert.type.toLowerCase();
            if(word==='danger'){
               word='error'
            }
        return word.charAt(0).toUpperCase() + word.slice(1);
        
    }
}
 
  return (<div className="container-my-3">
    <div>
    {props.alert && <div   className={`alert alert-${props.alert.type}  alert-dismissible fade show` } role="alert">
            <strong>{captalizeWord(props.alert.type)}</strong> {props.alert.message}
            
        </div>}
      </div>
      </div>

  )
}
