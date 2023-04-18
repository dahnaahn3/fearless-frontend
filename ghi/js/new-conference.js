window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/locations/'
    const response = await fetch(url);
    if (response.ok) {
    const data = await response.json();
    const selectTag = document.getElementById("location")
    for(let location of data.locations){
        // console.log(location)
        const option = document.createElement("option")
        option.value=location.id
        // console.log(option.value)
        option.innerHTML=location.name
        // console.log(option.innerHTML)
        selectTag.appendChild(option)
    }
}
});

const formTag = document.getElementById("create-conference-form")
formTag.addEventListener("submit", async event =>{
    event.preventDefault();
    const formData = new FormData(formTag);
    const json = JSON.stringify(Object.fromEntries(formData));
    const conferencesUrl = 'http://localhost:8000/api/conferences/';
    const fetchConfig = {
        method: "post",
        body: json,
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(conferencesUrl, fetchConfig);
    if (response.ok){
        formTag.reset();
        const newConference = await response.json();
        console.log(newConference)
    }
});
