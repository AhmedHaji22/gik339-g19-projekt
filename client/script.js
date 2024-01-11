const url = "http://localhost:3000/users";

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((users) => {
      if (users.length > 0) {
        let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
        users.forEach((user) => {
          html += `
        <li
          class="bg-${user.color}-200 text-${user.color}-900 p-2 rounded-md border-2 border-${user.color}-400 flex flex-col justify-between">
          <h3>Model: ${user.model}</h3>
          <p>Miltal: ${user.mileage}</p>
          <p>Drivmedel: ${user.fuel}</p>
          <p>Årsmodell: ${user.year}</p>
          <p>Växellåda: ${user.transmission}</p>
          <p>Färg: ${user.color}</p>
          <div>
            <button
              class="border border-${user.year}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentUser(${user.id})">
              Ändra
            </button>
            <button class="border border-${user.year}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="deleteUser(${user.id})">
              Ta bort
            </button>
          </div>
        </li>`;
        });
        html += `</ul>`;

        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
      }
    });
}

function setCurrentUser(id) {
  console.log("current", id);

  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((user) => {
      console.log(user);
      userForm.model.value = user.model;
      userForm.mileage.value = user.mileage;
      userForm.fuel.value = user.fuel;
      userForm.year.value = user.year;
      userForm.transmission.value = user.transmission;
      userForm.color.value = user.color;

      localStorage.setItem("currentId", user.id);
    });
}

function deleteUser(id) {
  const confirmed = confirm(`Are you sure you want to delete the car?`);
  if (confirmed) {
    console.log("delete", id);
    fetch(`${url}/${id}`, { method: "DELETE" }).then((result) => fetchData());
  }
}

userForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    model: "",
    mileage: "",
    fuel: "",
    year: "",
    transmission: "",
    color: "",
  };
  serverUserObject.model = userForm.model.value;
  serverUserObject.mileage = userForm.mileage.value;
  serverUserObject.fuel = userForm.fuel.value;
  serverUserObject.year = userForm.year.value;
  serverUserObject.transmission = userForm.transmission.value;
  serverUserObject.color = userForm.color.value;

  const id = localStorage.getItem("currentId");
  if (id) {
    serverUserObject.id = id;
  }

  const request = new Request(url, {
    method: serverUserObject.id ? "PUT" : "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverUserObject),
  });

  fetch(request).then((response) => {
    fetchData();

    localStorage.removeItem("currentId");
    userForm.reset();
  });
}

/*const exampleModal = document.getElementById("exampleModal");
if (exampleModal) {
  exampleModal.addEventListener("show.bs.modal", (event) => {});
}*/

const exampleModal = document.getElementById("exampleModal");
const modalTitle = document.querySelector(".modal-title");
const modalBody = document.querySelector(".modal-grejen");

if (exampleModal) {
  exampleModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;

    if (button && button.name === "submitUserForm") {
      // If the modal is triggered by the "Skicka" (Submit) button
      modalTitle.textContent = "Skicka";
      modalBody.textContent = "Are you sure you want to submit?";
    }
  });
}
