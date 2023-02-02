const notes = JSON.parse(localStorage.getItem('notes')) || [];
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const colorInput = document.getElementById('color');
console.log(colorInput.value)
const addBtn = document.getElementById('add-btn');
const app = document.getElementById('app');
const pinnedContainer = document.getElementById('pinned');
let currentIndex = 0;

const editForm = document.getElementById('isEdit');
const editTitleInput = document.getElementById('editTitle');
const editContentInput = document.getElementById('editContent');
const editColorInput = document.getElementById('editColor');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');

const addForm = document.getElementById('addForm');

const createNote = (title, content, color, date) => {
  return { title, content, color, date, isPinned: false};
};

const saveNote = (note) => {
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
};

const deleteNote = (index) => {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
};

const pinNote = (note, noteElement) => {
  let clone = noteElement.cloneNode()
  if(note.isPinned == false)
  {
    noteElement.remove();
    pinnedContainer.appendChild(clone)
    note.isPinned = true
    location.reload();
  } else {
    noteElement.remove();
    app.appendChild(clone)
    note.isPinned = false;
    location.reload();
  }
  localStorage.setItem('notes', JSON.stringify(notes));  
}

const editNote = (index) => {
    app.style.display = "none";
    addForm.style.display = "none";
    editForm.style.display = "flex";

    editTitleInput.value = notes[index].title;
    editContentInput.value = notes[index].content;
    editColorInput.value = notes[index].color;
    currentIndex = index;
    console.log(currentIndex)
}

const edit = (index) => {
    console.log(index)
    app.style.display = "column";
    addForm.style.display = "flex";
    editForm.style.display = "none";
    let dateTime = new Date();

    notes[index].title = editTitleInput.value;
    notes[index].content =  editContentInput.value;
    notes[index].color = editColorInput.value;
    notes[index].date = dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

const renderNotes = () => {
    app.innerHTML = '';
    notes.forEach((note, index) => {
        const noteEl = document.createElement('div');
        noteEl.style.backgroundColor = note.color;
        noteEl.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <p>Date: ${note.date}</p>
        <button onclick="deleteNote(${index})">Delete Note</button>
        <button onclick="editNote(${index})">Edit Note</button>
        `;
        let pinBtn = document.createElement('button');
        pinBtn.textContent = 'Pin';
        pinBtn.addEventListener('click', (e) => {
          pinNote(note, noteEl)
        
        });
        noteEl.appendChild(pinBtn);
        console.log(note.color);
        if(note.isPinned)
        {
          pinnedContainer.appendChild(noteEl);
        } else {        
          app.appendChild(noteEl);
        }
    });
};
confirmBtn.addEventListener('click', (e) => {
    edit(currentIndex);
})
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let dateTime = new Date();
    const title = titleInput.value;
    const content = contentInput.value;
    const color = colorInput.value;
    const date = dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();
    saveNote(createNote(title, content, color, date));
});


renderNotes();
