import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

export default function UpdateProfile(){

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Tsy mitovy le mot de passe roa!")
        }

        const promises = []
        setError("")
        setLoading(true)
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate("/")
        }).catch(() => {
            setError("Ohh il y a une erreur lors de la modification!")
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <>
            <Card>

                <Card.Body>
                    <h3 className="text-center mb-4">Modifier le profil</h3>

                    {/* {JSON.stringify(currentUser)} */}

                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={ currentUser.email } />
                        </Form.Group>
                        <Form.Group id="mot-de-passe">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="N'ajoutes rien si tu veux garder l'ancien"/>
                        </Form.Group>
                        <Form.Group id="confirme-mot-de-passe">
                            <Form.Label>Confirme ton mot de passe</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="N'ajoutes rien si tu veux garder l'ancien"/>
                        </Form.Group>

                        <Button disabled={loading} className="w-100" type="submit">Changer</Button>
                    </Form>
                </Card.Body>

            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Retour</Link>
            </div>
        </>
    )
}