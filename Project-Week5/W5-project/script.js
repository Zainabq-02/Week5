// ========== Variables ==========
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");
const message = document.getElementById("message");

// ========== Event Listeners ==========
addNoteBtn.addEventListener("click", addNote);
document.addEventListener("DOMContentLoaded", showNotes);

// ========== Functions ==========
// Get notes from localStorage
function getNotesFromStorage() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

// Save notes to localStorage
function saveNotesToStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Add Note
function addNote() {
  const noteText = noteInput.value.trim();
  if (!noteText) return;

  const note = {
    id: Date.now(), // unique id
    content: noteText
  };
  // Spread operator to add note
  const notes = [...getNotesFromStorage(), note];
  saveNotesToStorage(notes);
  noteInput.value = "";
  showNotes();

  // Show confirmation with setTimeout
  message.classList.remove("hidden");
  setTimeout(() => {
    message.classList.add("hidden");
  }, 1500);
}

// Delete Note
function deleteNote(id) {
  let notes = getNotesFromStorage();
  // Using filter to remove note
  notes = notes.filter(note => note.id !== id);
  saveNotesToStorage(notes);
  showNotes();
}

// Display Notes
function showNotes() {
  const notes = getNotesFromStorage();
  notesList.innerHTML = "";

  // Use map to render notes
  notes.map(({ id, content }) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.innerHTML = `
      <p>${content}</p>
      <button class="delete-btn" onclick="deleteNote(${id})">Delete</button>
    `;
    notesList.appendChild(noteDiv);
  });
}
