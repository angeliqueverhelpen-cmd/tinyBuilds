import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"; // Initialize Firebase app
import {
  getDatabase, // Get a reference to the database service
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"; // Import necessary functions from Firebase database module

const firebaseConfig = {
  // Firebase configuration object
  databaseURL:
    "https://leads-tracker-app-ad7fc-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig); // Initialize Firebase app with the provided configuration
const database = getDatabase(app); // Get a reference to the database service

console.log(database);

let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // Loop through each lead and create list items
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems; // Update the unordered list with the generated list items
}
const referenceInDB = ref(database, "leads"); // Reference to the "leads" node in the database
console.log(snapshotValues); // Log the snapshot values for debugging purposes
const leads = Object.values(snapshotValues); // Convert snapshot values to an array of leads
console.log(leads); // Log the array of leads for debugging purposes
// Note: The above lines are for initial debugging and can be removed later if not needed
// They are executed immediately after defining the reference in the database and before any real-time updates occur

onValue(referenceInDB, function (snapshot) {
  // Listen for real-time updates from the database
  const snapshotDoesExist = snapshot.exists(); // Check if the snapshot contains any data
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val(); // Get the values from the snapshot
    const leads = Object.values(snapshotValues); // Convert snapshot values to an array of leads
    render(leads); // Render the leads in the UI
  } else {
    ulEl.innerHTML = ""; // Clear the UI if no leads exist in the database
  }

  deleteBtn.addEventListener("dblclick", function () {
    // Clear all leads on double click
    remove(referenceInDB); // Remove all leads from the database on double click
    ulEl.innerHTML = ""; // Clear the UI after removing all leads from the database
  });

  inputBtn.addEventListener("click", function () {
    // Add a new lead on button click
    myLeads.push(inputEl.value);
    push(referenceInDB, inputEl.value);
    inputEl.value = "";
    render(myLeads);
  });
}); // End of onValue listener for real-time updates from the database
