// Setup global variables
let messageAPI = '';
let messageElements = null;
let messageAPItoken = '<YOUR-TOKEN>';

/**
 * Initialize the Message functions
 * @param {string} url The url to the MessagingAPI
 * @param {object} elements All the elements 
 */
export function loadMessage(url, elements) {

    // Set the messageAPI variable
    messageAPI = url;

    // Set the elements
    messageElements = elements;
    
    // Listen for button clicks
    listenForButtonEvents();
    
}

/**
 * Listen for button action events
 */
function listenForButtonEvents() {

    // Listen for opening the modal
    messageElements.openButton.addEventListener('click', () => {
        messageElements.modal.classList.add('show');
    });
    
    // Listen for closing the button
    messageElements.closeButton.addEventListener('click', () => {
        messageElements.modal.classList.remove('show');
    });

    // Listen for submitting the message
    messageElements.form.addEventListener('submit', (e) => {

        // Stop the page from reloading
        e.preventDefault();

        // Check the inputs
        çheckInputs();

    });

    // Listen for changes on fullName
    messageElements.inputs.fullName.addEventListener('change', (e) => {
        if(e.target.value.length === 0)
            setStatusOnInput('error', messageElements.inputs.fullName, 'Dit veld is verplicht');
        else
            setStatusOnInput('success', messageElements.inputs.fullName);
    })

    // Listen for changes on fullName
    messageElements.inputs.message.addEventListener('change', (e) => {
        if(e.target.value.length === 0)
            setStatusOnInput('error', messageElements.inputs.message, 'Dit veld is verplicht');
        else
            setStatusOnInput('success', messageElements.inputs.message);
    })

}

// Check all the fields if they are filled in.
function çheckInputs() {
    
    // Get the value
    const fields = {
        fullName: messageElements.inputs.fullName.value.trim(),
        mail: messageElements.inputs.mail.value.trim(),
        phone: messageElements.inputs.phone.value.trim(),
        message: messageElements.inputs.message.value.trim(),
        platform: 'web'
    }

    // Check if required fields are filled in
    if(fields.fullName.length === 0) 
    {
        setStatusOnInput('error', messageElements.inputs.fullName, 'Dit veld is verplicht');
        return
    }
    if(fields.message.length === 0) {
        setStatusOnInput('error', messageElements.inputs.message, 'Dit veld is verplicht');
        return;
    }

    // Send the message to the API
    sendMessageToAPI(JSON.stringify(fields));

}

/**
 * Send the message to the API
 * @param {*} body JSON string with all the needed values 
 */
function sendMessageToAPI(body) {

    // Setup the XMLHttpRequest
    const xhttp = new XMLHttpRequest();

    // Check if the request was succesfull
    xhttp.onreadystatechange = function() {
        // Check if the state is 4 and request status is OK
        if(this.readyState === 4) {

            if(this.status === 200) {
                
                // Show the success modal
                showSuccessModal();

            } else {
                alert('Er liep iets fout bij het versturen van dit bericht. Probeer later opnieuw.');
            }

        }
    }

    // Open the request
    xhttp.open('POST', messageAPI);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Authorization', 'Basic ' + messageAPItoken);
    xhttp.send(body);

}

/**
 * Show the success modal after the message was send to the API
 */
function showSuccessModal() {
    // Get the success Modal
    const successModal = messageElements.form.querySelector("#successModal");

    // Add the show class to the success modal
    successModal.classList.add('show');

    // Hide the full modal after 5 seconds
    setTimeout(() => {
        // Hide the main modal
        messageElements.modal.classList.remove('show');

        // clear the form
        messageElements.form.reset();

        // Hide the success Modal
        successModal.classList.remove('show');

    }, 5000);
}

// Set the input field on Error
function setStatusOnInput(status, input, message = '') {

    // Get the parent of the input
    const parent = input.parentElement;
    const errorHolder = parent.querySelector('small');

    // Add the message to the holder
    errorHolder.innerText = message;

    // Add the correct class
    parent.className = `input-box ${status}`;
}