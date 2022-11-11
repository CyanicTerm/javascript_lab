var input = document.createElement("input");
var main = document.getElementById('new');

// const inputGroup = document.createElement("div");
// inputGroup.setAttribute('class', 'input-group mb-3')

// const inputField = document.createElement("input");
// inputField.setAttribute('class', 'form-control');
// inputField.setAttribute('type', 'text');
// inputField.setAttribute('aria-describedby', 'button-addon2');

// const deleteButton = document.createElement("button");
// deleteButton.setAttribute('class', 'btn btn-outline-danger');
// deleteButton.setAttribute('type', 'button');
// deleteButton.setAttribute('id', 'button-addon2');
// // deleteButton.setAttribute('onclick', 'deleteElement()');
// deleteButton.textContent = 'Usuń'

function addElement() {   
    const inputGroup = document.createElement("div");
inputGroup.setAttribute('class', 'input-group mb-3')

const inputField = document.createElement("input");
inputField.setAttribute('class', 'form-control');
inputField.setAttribute('type', 'text');
inputField.setAttribute('aria-describedby', 'button-addon2');

const deleteButton = document.createElement("button");
deleteButton.setAttribute('class', 'btn btn-outline-danger');
deleteButton.setAttribute('type', 'button');
deleteButton.setAttribute('id', 'button-addon2');
deleteButton.textContent = 'Usuń' 
    main.appendChild(inputGroup);
    main.appendChild(inputField);
    main.appendChild(deleteButton);
    document.getElementById('button-addon2').onclick = function() {
        main.removeChild(inputGroup);
    main.removeChild(inputField);
    main.removeChild(deleteButton);
    }
}

