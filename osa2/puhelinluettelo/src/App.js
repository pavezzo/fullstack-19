import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'


const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newCheck, setNewCheck] = useState('')
    const [ notification, setNotification ] = useState(null)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
                .then(initialPersons => {
                    setPersons(initialPersons)
                })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleNewCheck = (event) => {
        setNewCheck(event.target.value)
    }

    const handleDelete = (event) => {
        event.preventDefault()
        const id = event.target.id
        personService
            .deletePerson(id)
                .then(() => {
                    personService
                        .getAll()
                            .then(newPersons => {
                                setPersons(newPersons)
                                setNotification('Henkilön poisto onnistui')
                            })
                }).catch(err => {
                    setError('Henkilön poisto ei onnistunut')
                })

        setTimeout(() => {
            setNotification(null)
            setError(null)
        }, 5000);
    }

    const addPerson = (event) => {
        event.preventDefault()

        const newPersonObj = {
            name: newName,
            number: newNumber
        }

        if (persons.some(e => e.name === newName)) {
            if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) { 
                const person = persons.find(e => e.name === newName)
                person.number = newNumber
                personService
                    .updatePerson(person)
                        .then(newPerson => {
                            personService
                                .getAll()
                                    .then(newPersons => {
                                        setPersons(newPersons)
                                        setNotification(`${person.name}n numero vaihdettu`)
                                    })
                        }).catch(err => {
                            setError('Numeron vaihto epäonnistui')
                        })
            }
        } else {
            personService
                .create(newPersonObj)
                    .then(returnedPerson => {
                        setPersons(persons.concat(returnedPerson))
                        setNotification(`Lisättiin ${newPersonObj.name}`)
                    }).catch(err => {
                        setError('Henkilön luonti epäonnistui')
                    })
        }
              
        setNewName('')
        setNewNumber('')

        setTimeout(() => {
            setNotification(null)
            setError(null)
        }, 5000);
    } 

    return (
        <div>
        <Notification message={notification} />
        <ErrorNotification message={error} />
        <h2>Puhelinluettelo</h2>
        <Filter newCheck={newCheck} handleNewCheck={handleNewCheck}/>
        <br></br>
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        <h2>Numerot</h2>
        <Persons persons={persons} newCheck={newCheck} handleDelete={handleDelete}/>
        </div>
    )
}

export default App