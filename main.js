const box = document.querySelector("#list");

const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Поиск пользователя...");
searchInput.classList.add("border", "p-2", "rounded", "mb-4", "w-full", "transition");

const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "Dark Mode";
darkModeBtn.classList.add("p-2", "rounded", "mb-4", "bg-gray-700", "text-white", "transition");


document.body.insertBefore(darkModeBtn, box);
document.body.insertBefore(searchInput, box);

let usersData = [];

function renderUser(url) {
    box.innerHTML = "";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            usersData = data; 
            displayUsers(usersData);
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));
}

function displayUsers(users) {
    box.innerHTML = users.map(user => `
        <li class="w-[300px] bg-white text-black rounded p-5 flex flex-col items-center shadow-lg">
            <p>ID: ${user.id}</p>
            <h2>${user.name}</h2>
            <h3>@${user.username}</h3>
            <p>Street: ${user.address.street}</p>
            <p>Suite: ${user.address.suite}</p>
            <p>City: ${user.address.city}</p>
            <p>Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}</p>
        </li>
    `).join("");
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = usersData.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
});


darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        document.body.style.backgroundColor = "#1a202c"; 
        darkModeBtn.textContent = "Light Mode";
        darkModeBtn.classList.replace("bg-gray-700", "bg-gray-300");
        darkModeBtn.classList.replace("text-white", "text-black");

        
        searchInput.style.backgroundColor = "#f0f0f0";
        searchInput.style.color = "#000";
        searchInput.style.border = "1px solid #ccc";
    } else {
        document.body.style.backgroundColor = ""; 
        darkModeBtn.textContent = "Dark Mode";
        darkModeBtn.classList.replace("bg-gray-300", "bg-gray-700");
        darkModeBtn.classList.replace("text-black", "text-white");


        searchInput.style.backgroundColor = "";
        searchInput.style.color = "";
        searchInput.style.border = "";
    }
});


renderUser("https://jsonplaceholder.typicode.com/users");
