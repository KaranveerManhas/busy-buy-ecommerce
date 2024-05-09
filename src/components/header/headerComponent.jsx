import React from 'react'
import Form from 'react-bootstrap/Form';

export const HeaderComponent = () => {
  return (
    <header className="text-center m-5 p-3">
      <Form className="d-flex justify-content-center mb-3">
        <Form.Label />
        <Form.Control type="text" placeholder="Search for item" className="border-primary w-auto" />
      </Form>
    </header>
  )
}

