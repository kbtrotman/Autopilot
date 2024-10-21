import React, { useEffect, useRef } from 'react';
import formBuilder from 'form-builder';  // or 'form-builder'


const FormBuilderComponent = () => {
    const formBuilderRef = useRef(null);
  
    useEffect(() => {
      const options = {
        // You can customize available fields, language, and more via options
        disableFields: ['hidden'],  // Optional: Disable any fields you don't want to use
        onSave: function (event, formData) {
          console.log('Form Data:', formData);  // Handle form data submission
        },
      };
  
      // Initialize formBuilder with drag-and-drop capability
      const formBuilderInstance = formBuilder(formBuilderRef.current, options);
  
      return () => {
        // Cleanup when the component is unmounted
        formBuilderInstance.actions.clearFields();
      };
    }, []);
  
    return (
      <div>
        <h3>Create Your Form</h3>
        <div ref={formBuilderRef}></div>  {/* This is where the drag-and-drop form will appear */}
      </div>
    );
  };
  
  export default FormBuilderComponent;