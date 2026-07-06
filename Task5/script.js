// 1. Notes Array (main storage)
let notes = [];

// 2. Select DOM elements
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.getElementById("notesContainer");
const counter = document.getElementById("counter");

// 3. Add Note Event
addBtn.addEventListener("click", addNote);

// 4. Add Note Function
function addNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  // validation
  if (title === "") {
    alert("Please enter a title");
    return;
  }

  // create note object
  const note = {
    id: Date.now(),
    title: title,
    content: content
  };

  // add to array
  notes.push(note);

  // save + render
  saveNotes();
  renderNotes();

  // clear inputs
  titleInput.value = "";
  contentInput.value = "";
}

// 5. Render Notes Function
function renderNotes(filteredNotes = notes) {
  notesContainer.innerHTML = "";

  filteredNotes.forEach(note => {
    const card = document.createElement("div");
    card.classList.add("note-card");
    card.setAttribute("data-id", note.id);

    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button class="delete-btn">Delete</button>
    `;

    notesContainer.appendChild(card);
  });

  // update counter
  counter.textContent = `Total Notes: ${filteredNotes.length}`;
}

// 6. Delete Note (Event Delegation)
notesContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.parentElement.getAttribute("data-id"));
    deleteNote(id);
  }
});

// 7. Delete Note Function
function deleteNote(noteId) {
  notes = notes.filter(note => note.id !== noteId);

  saveNotes();
  renderNotes();
}

// 8. Save to localStorage
function saveNotes() {
  localStorage.setItem("notesData", JSON.stringify(notes));
}

// 9. Load from localStorage
function loadNotes() {
  const data = localStorage.getItem("notesData");

  if (data) {
    notes = JSON.parse(data);
  } else {
    notes = [];
  }

  renderNotes();
}

// 10. Search Notes (Live Search)
searchInput.addEventListener("input", function () {
  searchNotes(this.value);
});

// 11. Search Function
function searchNotes(query) {

  const text = query.trim().toLowerCase();

  // if empty → show all notes
  if (text === "") {
    renderNotes(notes);
    return;
  }

  const filtered = notes.filter(note => {
    return (
      note.title.toLowerCase().includes(text) ||
      note.content.toLowerCase().includes(text)
    );
  });

  renderNotes(filtered);
}

// 12. Load notes on page start
loadNotes();