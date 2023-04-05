function createCard(name, description, pictureUrl, startdate, enddate, location) {
    return `
        <div class="container" style="display: grid;">


        <div class ="row">
        <div class="col-12 col-md-4">

              <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 20rem;">
                  <img src="${pictureUrl}" class="card-img-top">
                  <div class="card-body">
                      <p c lass="card-body" style="color: grey">${location}</p>
                      <h5 class="card-title">${name}</h5>
                      <p class="card-text">${description}</p>
                      <div class="card-footer">${startdate} - ${enddate}</div>
                  </div>
              </div>
          </div>
          </div>
        </div>
        `;
}

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Response not ok")
    } else {
      const data = await response.json();

      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;

          const starts = new Date(details.conference.starts);
          const startdate = `${starts.getMonth()}/${starts.getDate()}/${starts.getFullYear()}`

          const ends = new Date(details.conference.ends);
          const enddate = `${ends.getMonth()}/${ends.getDate()}/${ends.getFullYear()}`

          const location = details.conference.location.name;

          const html = createCard(title, description, pictureUrl, startdate, enddate, location);

          const column = document.querySelector('.row');
          column.innerHTML += html;
        }
      }

    }
  } catch (e) {
    console.error("error", error)
  }

});
