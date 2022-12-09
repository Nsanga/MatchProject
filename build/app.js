let tableBody = document.getElementById("tableBody");
let table = document.querySelector("table");
let jour = document.getElementById("jour");

function time(datej) {
    datej = document.createElement("div");
    let d = new Date();
    datej.innerHTML += 'Journée du: '+ d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    jour.appendChild(datej);
    datej.classList.add("date");
}
time()


function display(data) {

    let table = "<table>";
    for (let key of data) {
        let hours = new Date(key.event_date).getHours();
        let minutes = new Date(key.event_date).getMinutes();
        table += `<tr>
                    <td><img src="${key.homeTeam.logo}"/>
                    <br><span>${key.homeTeam.team_name}</span></td>
                    <td>${hours+":"+minutes}
                    <br><span id="stade">${key.venue}</span></td>
                    <td><img src="${key.awayTeam.logo}"/>
                    <br><span>${key.awayTeam.team_name}</span></td>
                </tr>`;
    }
    table += "</table>";
    tableBody.innerHTML = table;

}

function fetchAPI() {
    let d = new Date();
    let date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate());
    fetch("http://ec2-54-89-38-236.compute-1.amazonaws.com:5000/api/v1/fixtures/matchsleague/" + date + "/World/World%20Cup")
        .then((response) => response.json())
        .then(data => {
            if(data.fixture==""){
                table.innerHTML = ""
                let space = document.createElement("div");
                let image = document.createElement('img');
                
                image.src="assets/ball.jpg"
                table.appendChild(image);
                image.classList.add("image")
                
                space.innerHTML="Pas de match aujourd'hui";
                table.appendChild(space);
                space.classList.add("vide");
            }else{
                display(data.fixture);
            }
            
            
        });
}
fetchAPI();


