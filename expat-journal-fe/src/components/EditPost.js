import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {formValidation, addPostValidation} from "../utils/validation"
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import {AddNewPost} from "../store/actions"
import {connect, useDispatch} from "react-redux"


import { Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { axiosWithAuth } from '../utils/axiosWithAuth';


const Form = styled.form
    `
        display: flex;
        flex-direction: column;
        background-color: lightblue;
        width: 90%;
        margin: 3% auto;
        padding: 2% 0; 
        `

const Label = styled.label
    `
        justify-content: flex-end;
        `

const TextBox = styled.input
    `
        margin-top: 3%;
        height: 100px;
        width: 50%;
        
        `

const Input = styled.input
    `
        margin-top: 3%;
        `

const StyledButton = styled.button
    `
    margin: 3% auto;
width: 30%;

`





function EditPost(props) {
    const history = useHistory()
    console.log("title:", props.blogToEdit.title)
    const initialFormValues = {
        title: props.blogToEdit.title,
        textbox: props.blogToEdit.textbox,
        created_at: props.blogToEdit.created_at,
        img: props.blogToEdit.img
    }
    
    const initialFormErrors = {
        title: '',
        textbox: '',
        created_at: '',
    }

    useEffect(()=>{
        setFormValues({
        title: props.blogToEdit.title,
        textbox: props.blogToEdit.textbox,
        created_at: props.blogToEdit.created_at,
        img: props.blogToEdit.img
        })
        
    },[props.blogToEdit.title])
    

    console.log("EditPost:",props)

    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [formDisabled, setFormDisabled] = useState(true)



    useEffect(() => {
        addPostValidation.isValid(formValues)
            .then(valid => { // either true or false
                setFormDisabled(!valid)
            })
    }, [formValues])

    const onInputChange = evt => {
        const name = evt.target.name
        const value = evt.target.value
        yup
            .reach(addPostValidation, name)
            .validate(value)
            .then(valid => {
                setFormErrors({
                    ...formErrors,
                    [name]: formValues.name,

                })
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.message
                })
            })
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const newPost = {
        title: formValues.title,
        textbox: formValues.textbox,
        img: formValues.img,
        created_at: formValues.created_at,
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .put(`/api/users/${props.blogToEdit.user_id}/blogs/${props.blogToEdit.id}`,formValues)
        .then(res => {

            console.log(res)
            history.push("/dashboard")
            history.go(0)
        })
        .catch(err => console.log(err))
    }


    return (
    <>  
        {/* <Header/> */}
        <Modal isOpen={props.show}>
        <ModalHeader ><h2>Edit Post</h2></ModalHeader>
        <ModalBody>
        <Form onSubmit={(e)=>handleSubmit(e)}>

            <Label>Post Title:&nbsp;
                <Input
                    value={formValues.title}
                    onChange={onInputChange}
                    name='title'
                    type='text'
                />
            </Label>

            {formErrors.title}

            <Label>Caption: &nbsp;
                <TextBox 

                    value={formValues.textbox}
                    onChange={onInputChange}

                    name='textbox'
                    type='text'
                />
            </Label>
            {formErrors.textbox}

            <Label>Image URL: &nbsp;
                <Input

                    value={formValues.img}
                    onChange={onInputChange}

                    name='img'
                    type='text'
                />
            </Label>
            {formErrors.img}

            <Label>Date added:&nbsp;
                <Input

                    value={formValues.created_at}
                    onChange={onInputChange}
                    name='created_at'
                    type='text'
                    placeholder="Ex. Apr 26 2020"
                />
            </Label>
            {formErrors.created_at}


            {/* ////////// DISABLED CANNOT SUBMIT UNTIL ALL IS COMPLETE ////////// */}


            <Button 
                /*onClick={onSubmit} disabled={!formDisabled}*/ 
            >
                Submit Changes
                </Button>


        </Form >
        </ModalBody>
        <Button onClick={props.toggle}>Close</Button>
        </Modal>
    </>
    )
}
export default EditPost;

// const mapStateToProps = state => {
//     console.log(`add post`, state)
//     return {
// isLoading: state.postReducer.isLoading,
// blogs: state.postReducer.blogs
//     }
// }
// export default connect(
//     mapStateToProps,
//     {AddNewPost},
// )(EditPost)
