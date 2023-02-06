/** Import the config */
import { config } from '../config.js';

/** Setup the listener */
export async function listenForMessages() {

    // Listen for the button click
    config.message.buttons.create.addEventListener('click', function() {
        toggleModal('open');
    });

    // Listen for submit of the form
    config.message.modal.form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm();
    });

    // Listen for reset of the form
    config.message.modal.form.addEventListener('reset', function(e) {
        toggleModal('close');
    });

    // Listen for the close button
    config.message.modal.buttons.close.forEach((item) => {
        item.addEventListener('click', function() {
            toggleModal('close');
        });
    });

}

/**
 * Toggle the modal display
 * @param {String} type close or open the modal
 */
function toggleModal(type) {
    if(type === 'open') {
        // open the modal
        config.message.modal.component.showModal();
    } else if(type === 'close') {
        // Close the modal
        config.message.modal.component.close();

        // reset the form
        config.message.modal.form.reset();

        // Reset the screens
        config.message.modal.screens.complete.classList.remove('visible');
        config.message.modal.screens.entry.classList.add('visible');
    }
}

/**
 * Submit the form information to the API
 * @returns True/false
 */
async function submitForm() {

    // Get the individual elements
    const fields = {
        fullName: config.message.modal.form.elements['fullName'],
        mail: config.message.modal.form.elements['mail'],
        phone: config.message.modal.form.elements['phone'],
        message: config.message.modal.form.elements['message'],
    }

    // Check if the form is valid
    if(!validateForm(fields)) return false;

    // Get the value from the inputs
    const values = {
        fullName: fields.fullName.value,
        mail: fields.mail.value,
        phone: fields.phone.value,
        message: fields.message.value,
        platform: 'web'
    }
    
    // Try to submit the info to the API
    await submitFormToApi(values)
    .then((data) => {
        if(!data.ok) { showError(); return; }
        return data.json();
    })
    .then((data) => {
        showComplete();
    })
    .catch((error) => {
        showError();
    });
    
}

/**
 * Check if the form values are valid
 * @param {Object} fields The form values
 */
function validateForm(fields) {
    // Check if the name is valid
    if(fields.fullName.value == '') { 
        fields.fullName.focus();    // Focus on the fullName field
        return false;               // Return false to stop the process
    };

    // Check if the email is valid
    const email = fields.mail.value;
    const atpos = email.indexOf('@');
    const dotpos = email.lastIndexOf('.');

    if(atpos < 1 || (dotpos - atpos < 2)) {
        fields.mail.focus();        // Focus on the mail field
        return false;               // Return false to stop the process
    }

    // Check if the message is valid
    if(fields.message.value == '') { 
        fields.message.focus();    // Focus on the message field
        return false;              // Return false to stop the process
    };

    // Default return
    return true;
}

/**
 * Send data to the API
 * @param {*} data The data you want to send to the API
 * @returns The fetch response (full then/catch)
 */
async function submitFormToApi(data) {

    // Fetch the information
    const response = await fetch(config.api.pointers.message, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + config.api.tokens.main
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
        
    // Return the response
    return response;
}

/**
 * Show the error
 */
function showError() {
    // Set the error text
    config.message.modal.error.classList.add('visible');
}

/**
 * Go complete
 */
function showComplete() {
    // Hide the form
    config.message.modal.screens.entry.classList.remove('visible');

    // Add it to the complete
    config.message.modal.screens.complete.classList.add('visible');
}