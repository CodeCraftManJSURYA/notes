document.addEventListener('DOMContentLoaded', () => {
  const notesContainer = document.querySelector('.notes-container');
  const createBtn = document.querySelector('.btn');
  let notes = document.querySelectorAll('.inputbox');

  // Function to restore the notes after restarting the browser
  function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes') || '';
  }
  showNotes();

  // Function to update the notes in browser storage
  function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
  }

  // Event listener to add a new note block when the create button is clicked
  createBtn.addEventListener('click', () => {
    let inputbox = document.createElement('p');
    let img = document.createElement('img');
    inputbox.className = 'inputbox';
    inputbox.setAttribute('contenteditable', 'true');
    img.src = 'images/delete.png';
    // Append the new note and delete icon to the notes container
    notesContainer.appendChild(inputbox).appendChild(img);
  });

  // Event listener for deleting notes and updating storage
  notesContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      // Remove the note if the delete icon is clicked
      e.target.parentElement.remove();
      updateStorage();
    } else if (e.target.tagName === 'P') {
      // Update storage when the content of a note is changed
      notes = document.querySelectorAll('.inputbox');
      notes.forEach((nt) => {
        nt.onkeyup = function () {
          updateStorage();
        };
      });
    }
  });

  // Event listener to handle pressing Enter to insert a line break
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      document.execCommand('insertLineBreak');
      event.preventDefault();
    }
  });
});
