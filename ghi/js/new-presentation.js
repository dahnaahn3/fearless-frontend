window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/'

    const response = await fetch(url);

    if (response.ok){
        const data = await response.json()


        const selectTag = document.getElementById("conferences")
        for(let conference of data.conferences){
            const option = document.createElement("option")
            option.value=conference.id
            console.log("option value: " + option.value)
            option.innerHTML = conference.name
            console.log("option innerHTML: " + option.innerHTML)
            selectTag.appendChild(option)
        }
    }

    const formTag = document.getElementById("create-presentation-form")
    formTag.addEventListener("submit", async event =>{
        event.preventDefault();
        const formData = new FormData(formTag);
        const json =JSON.stringify(Object.fromEntries(formData));

        const selectTag = document.getElementById("conferences")
        console.log("selectTag: " + selectTag)
        const selectedOption = selectTag.options[selectTag.selectedIndex]
        console.log("selectedOption: " + selectedOption)
        const conferenceId = selectedOption.value;
        console.log("conferenceId: " + conferenceId)


        const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`
        const fetchConfig ={
            method: "post",
            body: json,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if(response.ok){
            formTag.reset();
            const newPresentation = await response.json;
            console.log("newPresentation: " + newPresentation)
        }

})

})
