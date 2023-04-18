import React, { useEffect, useState } from 'react'

function PresentationForm(){
const [ conferences, setConferences ] = useState([])
const [presenterName, setPresenterName] = useState('')
const [presenterEmail, setPresenterEmail] = useState('')
const [company, setCompany] = useState('')
const [title, setTitle] = useState('')
const [synopsis, setSynopsis] = useState('')
const [conferenceName, setConferenceName] = useState('')


const handlePresenterNameChange = (event) => {
    const value = event.target.value;
    setPresenterName(value);
  }

const handlePresenterEmailChange = (event) => {
    const value = event.target.value;
    setPresenterEmail(value);
  }

const handleCompanyChange = (event) => {
    const value = event.target.value;
    setCompany(value);
  }

const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  }

const handleSynopsisChange = (event) => {
    const value = event.target.value;
    setSynopsis(value);
  }

const handleConferenceNameChange = (event) => {
    const value = event.target.value;
    setConferenceName(value);
  }


const handleSubmit = async (event) => {
    event.preventDefault();
    const data={}

    data.presenter_name=presenterName;
    data.presenter_email=presenterEmail;
    data.company_name=company;
    data.title=title;
    data.synopsis=synopsis;
    data.conference=conferenceName

    const conferenceId = data.conference
    // console.log(conferenceId)
    // console.log('data' , data)

    const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`

    // console.log('url' , presentationUrl)

    const fetchConfig ={
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    };

    // console.log('fetchconfig' , fetchConfig)

    const response = await fetch(presentationUrl, fetchConfig);
    // console.log('response' , response)

    if(response.ok){
        const newPresentation = await response.json;
        // console.log('new presentation:', newPresentation)

        setPresenterName('')
        setPresenterEmail('')
        setCompany('')
        setTitle('')
        setSynopsis('')
        setConferenceName('')
}
}


    const fetchData = async() => {
    const url = 'http://localhost:8000/api/conferences/'
    const response = await fetch(url);
    if (response.ok){
    const data = await response.json()
    console.log(data)
    setConferences(data.conferences)

    }
}

useEffect(() => {
    fetchData();
}, []);




    return(
    <div className="row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
        <h1>Create a new presentation</h1>
        <form onSubmit={handleSubmit} id="create-presentation-form">

            <div className="form-floating mb-3">
            <input value={presenterName} onChange={handlePresenterNameChange} placeholder="Presenter name" required type="text" id="presenter_name" className="form-control"/>
            <label htmlFor="presenter_name">Presenter name</label>
            </div>

            <div className="form-floating mb-3">
            <input value={presenterEmail} onChange={handlePresenterEmailChange} placeholder="Presenter email" required type="text" id="presenter_email" className="form-control"/>
            <label htmlFor="presenter_email">Presenter email</label>
            </div>

            <div className="form-floating mb-3">
            <input value={company} onChange={handleCompanyChange} placeholder="Company" required type="text" id="company" className="form-control"/>
            <label htmlFor="company">Company</label>
            </div>

            <div className="form-floating mb-3">
            <input value={title} onChange={handleTitleChange} placeholder="Title" required type="text" id="title" className="form-control"/>
            <label htmlFor="title">Title</label>
            </div>

            <div className="mb-3">
            <label htmlFor="description">Synopsis</label>
            <textarea value={synopsis} onChange={handleSynopsisChange} className="form-control" id="synopsis" name="synopsis" rows="3"></textarea>
            </div>

            <div className="mb-3">
            <select onChange={handleConferenceNameChange} required id="conferences" name="conference" className="form-group">
                <option value={conferenceName}>Choose a conference</option>
                {conferences.map(conference=>{
                    return(
                        <option key={conference.id} value={conference.id}>
                            {conference.name}
                        </option>
                    )
                })}
            </select>
            </div>

            <button className="btn btn-primary">Create</button>
        </form>
        </div>
    </div>
    </div>

    )
}

export default PresentationForm
