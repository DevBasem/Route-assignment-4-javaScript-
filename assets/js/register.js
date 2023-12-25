/**
 * Prevents the default form submission behavior to stop page refresh.
 * @param {Event} event - The event object.
 */
function stopFormRefresh(event)
{
    event.preventDefault();
}

/**
 * Checks if a user with the given email exists in the user list.
 * @param {HTMLInputElement} emailInput - The email input element.
 * @param {Array} usersList - The list of user objects to check against.
 * @returns {boolean} True if the user exists, otherwise false.
 */
function isUserExist(emailInput, usersList)
{
    let flag = false;
    const emailToCheck = emailInput.value.toLowerCase();

    for (let i = 0; i < usersList.length; i++)
    {
        if (usersList[i].email.toLowerCase() === emailToCheck)
        {
            flag = true;
            break;
        }
    }
    return flag;
}

/**
 * Validates user registration input fields.
 * @param {HTMLInputElement} fNameInput - The first name input element.
 * @param {HTMLInputElement} lNameInput - The last name input element.
 * @param {HTMLInputElement} emailInput - The email input element.
 * @param {HTMLInputElement} passInput - The password input element.
 * @param {HTMLInputElement} confirmPassInput - The confirm password input element.
 * @param {HTMLInputElement} termsCheckBox - The terms and conditions checkbox element.
 * @returns {boolean} True if registration inputs are valid, otherwise false.
 */
function isValidRegistration(fNameInput, lNameInput, emailInput, passInput, confirmPassInput, termsCheckBox)
{
    const fNameI = fNameInput.value;
    const lNameI = lNameInput.value;
    const emailI = emailInput.value;
    const passI = passInput.value;
    const confirmPassI = confirmPassInput.value;
    const termsCheckBoxI = termsCheckBox.checked;

    if (!fNameI || !lNameI || !emailI || !passI || !confirmPassI || !termsCheckBoxI)
    {
        return false;
    }

    const emailRegex = /[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/g;
    if (!emailRegex.test(emailI))
    {
        return false;
    }

    if (passI.length < 7)
    {
        return false;
    }

    if (passI !== confirmPassI)
    {
        return false;
    }

    if (!termsCheckBoxI)
    {
        return false;
    }

    return true;
}

/**
 * Gathers and processes user registration data.
 * @param {HTMLInputElement} fNameInput - The first name input element.
 * @param {HTMLInputElement} lNameInput - The last name input element.
 * @param {HTMLInputElement} emailInput - The email input element.
 * @param {HTMLInputElement} passInput - The password input element.
 * @param {Array} usersList - The list of user objects to check for existing emails.
 */
function getSignUpData(fNameInput, lNameInput, emailInput, passInput, usersList)
{
    const user = {
        firstName: fNameInput.value,
        lastName: lNameInput.value,
        email: emailInput.value,
        password: passInput.value,
    };

    const emailExistErr = document.getElementById("emailExistErrMsg")
    const regSuccessMsg = document.getElementById("regSuccessMsg")

    console.log(isUserExist(emailInput, usersList));

    if (isUserExist(emailInput, usersList) == false)
    {
        emailExistErr.classList.add("hidden");
        regSuccessMsg.classList.remove("hidden");
        setTimeout(() => { regSuccessMsg.classList.add("hidden"); }, 3000);
        usersList.push(user);
        console.log(usersList)
    }
    else
    {
        emailExistErr.classList.remove("hidden");
        document.getElementById("email").addEventListener("focus", function ()
        {
            emailExistErr.classList.add("hidden");
        });
        regSuccessMsg.classList.add("hidden");
    }
}

/**
 * Resets values of user registration input fields.
 * @param {HTMLInputElement} fNameInput - The first name input element.
 * @param {HTMLInputElement} lNameInput - The last name input element.
 * @param {HTMLInputElement} emailInput - The email input element.
 * @param {HTMLInputElement} passInput - The password input element.
 * @param {HTMLInputElement} confirmPassInput - The confirm password input element.
 * @param {HTMLInputElement} termsCheckBox - The terms and conditions checkbox element.
 */
function resetSignUpInput(fNameInput, lNameInput, emailInput, passInput, confirmPassInput, termsCheckBox)
{
    fNameInput.value = "";
    lNameInput.value = "";
    emailInput.value = "";
    passInput.value = "";
    confirmPassInput.value = "";
    termsCheckBox.checked = false;
}

/**
 * Retrieves the list of users from local storage.
 * @returns {Array} List of user objects if available, or an empty array.
 */
function getUsersListFromLocalStorage()
{
    const storedUsersList = localStorage.getItem('usersList');
    return storedUsersList ? JSON.parse(storedUsersList) : [];
}

/**
 * Saves the list of users to local storage.
 * @param {Array} usersList - The list of user objects to be stored.
 */
function saveUsersListToLocalStorage(usersList)
{
    localStorage.setItem('usersList', JSON.stringify(usersList));
}

/**
 * Handles main form submission and registration logic.
 */
(function main()
{
    const form = document.getElementById("mainForm");
    const fNameInput = document.getElementById("fname");
    const lNameInput = document.getElementById("lname");
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");
    const confirmPassInput = document.getElementById("confirm_password");
    const termsCheckBox = document.getElementById("terms");

    const usersList = getUsersListFromLocalStorage();

    form.addEventListener("submit", stopFormRefresh);

    document.getElementById("registerButton").addEventListener("click", function ()
    {
        const isValidRegistr = isValidRegistration(fNameInput, lNameInput, emailInput, passInput, confirmPassInput, termsCheckBox);
        if (isValidRegistr == true)
        {
            getSignUpData(fNameInput, lNameInput, emailInput, passInput, usersList);
            resetSignUpInput(fNameInput, lNameInput, emailInput, passInput, confirmPassInput, termsCheckBox);

            saveUsersListToLocalStorage(usersList);
        }
    });

})();