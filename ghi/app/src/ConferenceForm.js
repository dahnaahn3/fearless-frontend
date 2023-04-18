import React, { useEffect, useState } from 'react'

function ConferenceForm(){
    const [locations, setLocations] = useState([])
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('')
    const [description, setDescription] = useState('')
    const [maxPresentations, setMaxPresentations] = useState('')
    const [maxAttendees, setMaxAttendees] = useState('')
    const [locationName, setLocationName] = useState('')


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
      }

    const handleStartsChange = (event) => {
        const value = event.target.value;
        setStarts(value);
      }

    const handleEndsChange = (event) => {
        const value = event.target.value;
        setEnds(value);
      }

      const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
      }

      const handleMaxPresentationsChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
      }

      const handleMaxAttendeesChange = (event) => {
        const value = event.target.value;
        setMaxAttendees(value);
      }

      const handleLocationNameChange = (event) => {
        const value = event.target.value;
        setLocationName(value);
      }

      const handleSubmit = async (event) => {
        event.preventDefault();

        const data={};
        data.name=name;
        data.starts=starts;
        data.ends=ends;
        data.description=description;
        data.max_presentations=maxPresentations;
        data.max_attendees=maxAttendees;
        data.location=locationName;

        const conferencesUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log('fetch' , fetchConfig)
        const response = await fetch(conferencesUrl, fetchConfig);
        console.log('response' , response)
        if (response.ok){
            const newConference = await response.json();

            setName('')
            setStarts('')
            setEnds('')
            setDescription('')
            setMaxPresentations('')
            setMaxAttendees('')
            setLocationName('')
        }
    }


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/'
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setLocations(data.locations)
    }
}

useEffect(() => {
    fetchData();
}, []);



    return(
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new conference</h1>

                <form onSubmit={handleSubmit} id="create-conference-form">

                  <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" id="name" name="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                  </div>

                  <div className="form-control mb-3">
                    <label>
                        Starts
                        <input onChange={handleStartsChange} value={starts} type="date" name="starts" />
                      </label>
                  </div>

                  <div className="form-control mb-3">
                    <label>
                        Ends
                        <input onChange={handleEndsChange} value={ends} type="date" name="ends" />
                      </label>
                  </div>


                  <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={handleDescriptionChange} value={description} className="form-control" id="description" name="description" rows="3"></textarea>
                  </div>

                  <div className="mb-3">
                    <input onChange={handleMaxPresentationsChange} value={maxPresentations} placeholder="Max Presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                  </div>

                  <div className="mb-3">
                    <input onChange={handleMaxAttendeesChange} value={maxAttendees} placeholder="Max attendees" required type="number" id="max_attendees" name="max_attendees" className="form-control"/>
                  </div>

                  <div className="mb-3">
                    <select onChange={handleLocationNameChange} value={locationName} required id="location" name="location" className="form-group">
                      <option value="">Choose a location</option>
                        {locations.map(location =>{
                            return(
                                <option key={location.id} value={location.id}>
                                    {location.name}
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

export default ConferenceForm
