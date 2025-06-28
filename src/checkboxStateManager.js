// checkboxStateManager.js

function saveCheckboxStates() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    localStorage.setItem(checkbox.id, checkbox.checked);
  });
}

// Function to load checkbox states from Local Storage
function loadCheckboxStates() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const savedState = localStorage.getItem(checkbox.id);
    
    if (savedState !== null) {
      checkbox.checked = savedState === 'true';
    }
  });
}

function loadEditCheckboxStates() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  saveCheckboxStates();
  
  if (checkboxes) {
    checkboxes.forEach((checkbox) => {
      const savedState = localStorage.getItem(checkbox.id);
      checkbox.checked = savedState === 'true';
    });
  }
}

function deleteCheckboxStates(title, details) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const savedState = localStorage.getItem(checkbox.id);
    if (savedState !== null) {
      localStorage.removeItem(title);
      localStorage.removeItem(details);
    }
  });
}

const input = document.querySelector('.container');
input.addEventListener("change", function(e) {
  if (e.target.type === 'checkbox') {
    saveCheckboxStates();
  }
});

// Load checkbox states on page load
//document.addEventListener('DOMContentLoaded', loadCheckboxStates);


export {
  saveCheckboxStates,
  loadCheckboxStates,
  loadEditCheckboxStates,
  deleteCheckboxStates
};