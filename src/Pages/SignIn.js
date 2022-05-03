import {React, useContext, useState} from'react'

import firebase from 'firebase/compat/app'

import {
    Container,
    Row, Col,
    Card, Form, CardHeader, 
    CardBody, FormGroup,
    Label,Input, CardFooter,
    Button
    


} from 'reactstrap'

import { UserContext } from '../Context/UserContext'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

const SignIn = ()=>{
    const context = useContext(UserContext)
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')

    const handleSignIn = () =>{
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(res =>{
            context.SetUser(res.user)
            toast("Successfully SignedIn" ,{type: 'success'})
        

        }).catch(error=>{
            toast(error.message, {type:error})
        })



    }

    const handleSubmit = e =>{
        e.preventDefault()
        handleSignIn()

    }

    if(context.user?.uid){
     //localStorage.setItem("user",JSON.stringify(context.user))
        return(
            <Navigate replace to ="/"/>
           

        )
       
    }


    return(
        <Container>
       <Row>
            <Col lg={6} className='offset-lg-3 mt-5'>
                <Card className='bg-dark text-danger'>
                <Form onSubmit={handleSubmit}>
                    <CardHeader className='text-center'>
                        <h3 className='font-weight-bold'>SignIn here</h3>
                    </CardHeader>
                        <CardBody>
                        
                            <FormGroup className='justify-content-center' row>
                               <Col sm={9} >
                                    <Input type='email'
                                     name='email' 
                                    id='email' 
                                    placeholder="Email" 
                                    value={email}
                                    onChange={e=>SetEmail(e.target.value)}/>
                               </Col>
                            </FormGroup>
                            <FormGroup className='justify-content-center' row>
                            <Col sm={9} >
                                 <Input type='password'
                                  name='password' 
                                 id='password' 
                                 placeholder="Password"
                                 value={password}
                                 onChange={e=>SetPassword(e.target.value)} />
                            </Col>
                         </FormGroup>
                        
                        </CardBody>
                        <CardFooter className='text-center'>
                            <Button type='submit' color='danger'>Sign In</Button>
                        </CardFooter>

                </Form>

                </Card>

            </Col>
       </Row>
        
        
       </Container>
    )
}

export default SignIn