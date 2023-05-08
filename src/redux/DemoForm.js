import React from 'react'
import { destroy, reduxForm } from 'redux-form'

let DemoForm = () => 
  <div>
    <h1>Gola React</h1>
  </div>

    DemoForm = reduxForm({
        form: 'demo',
        destroyOnUnmount: 
   

})(DemoForm)

export default DemoForm;