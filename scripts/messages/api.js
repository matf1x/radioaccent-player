/**
 * Submit the form to the API handler
 * @param {Object} elements The HTML elements
 * @returns A promise will be returned
 */
export function submit(elements) {
  return new Promise(async (resolve, reject) => {
    // Get the API
    const { api } = await import("../config.js")

    // Get the correct info
    const fields = {
      fullName: elements.message.modal.form.elements["fullName"],
      mail: elements.message.modal.form.elements["mail"],
      phone: elements.message.modal.form.elements["phone"],
      message: elements.message.modal.form.elements["message"],
    }

    // Check if the form is valid
    if (!validateForm(fields))
      reject(new Error("Niet alle velden zijn ingevuld"))

    // Get the correct info
    const body = {
      fullName: fields.fullName.value,
      mail: fields.mail.value,
      phone: fields.phone.value,
      message: fields.message.value,
      platform: "web",
    }

    // Send the info to the API
    fetch(api.pointers.message, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + api.tokens.main,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok)
          reject(
            new Error(
              "Er liep iets fout bij het verwerken van de gegevens. Probeer later opnieuw."
            )
          )
        return response.json()
      })
      .then((data) => {
        resolve()
      })
      .catch((err) =>
        reject(
          new Error(
            "Er liep iets fout bij het verwerken van de gegevens. Probeer later opnieuw."
          )
        )
      )
  })
}

/**
 * Check if the form values are valid
 * @param {Object} fields The form values
 */
function validateForm(fields) {
  // Check if the name is valid
  if (fields.fullName.value == "") {
    fields.fullName.focus() // Focus on the fullName field
    return false // Return false to stop the process
  }

  // Check if the email is valid
  const email = fields.mail.value
  const atpos = email.indexOf("@")
  const dotpos = email.lastIndexOf(".")

  if (atpos < 1 || dotpos - atpos < 2) {
    fields.mail.focus() // Focus on the mail field
    return false // Return false to stop the process
  }

  // Check if the message is valid
  if (fields.message.value == "") {
    fields.message.focus() // Focus on the message field
    return false // Return false to stop the process
  }

  // Default return
  return true
}
