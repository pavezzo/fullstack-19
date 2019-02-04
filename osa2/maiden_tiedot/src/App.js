import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
    const filteredCountries = props.countries.filter(e => e.name.toLowerCase().includes(props.filter.toLowerCase()))
    

    if (filteredCountries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    if (filteredCountries.length === 1) {
        return (
            <Country data={filteredCountries[0]}/> 
        )
    }

    const handleButton = (event) => {
        event.preventDefault()
        props.setFilter(event.target.id)
    }

    if (filteredCountries.length < 10) {
        return (
            <div>{filteredCountries.map(e => <p key={e.name}>{e.name} <button id={e.name} onClick={handleButton}>show</button></p>)}</div>
        )
    }

    return (
        <div></div>
    )
}

const Country = (props) => {
    return (
        <div>
            <h1>{props.data.name}</h1>
            <p>capital {props.data.capital}</p>
            <p>population {props.data.population}</p>
            <h2>languages</h2>
            {props.data.languages.map(e => <li key={e}>{e}</li>)}
            <img src={props.data.flag} height="270" width="420" alt="no pic found"></img>
        </div>
    )
}


const App = () => {
    const [countries, setCountries] = useState([])
    const [searchFilter, setSearchFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                const arr = response.data.map(e => {
                    return ({
                        name: e.name, 
                        capital: e.capital,
                        population: e.population,
                        languages: e.languages.map(b => b.name),
                        flag: e.flag
                    })
                })

                setCountries(arr)
            })
    }, [])

    const handleSearchChange = (event) => {
        setSearchFilter(event.target.value)
    }

    return (
        <div>
            find countries <input value={searchFilter} onChange={handleSearchChange}/>
            <Countries countries={countries} filter={searchFilter} setFilter={setSearchFilter} />
        </div>
    )
}



export default App;
