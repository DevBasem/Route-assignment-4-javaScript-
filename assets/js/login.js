/**
 * Prevents the default form submission behavior to stop page refresh.
 * @param {Event} event - The event object.
 */
function stopFormRefresh(event)
{
    event.preventDefault();
}

/**
 * Checks if a user is valid based on email and password inputs.
 * @param {HTMLInputElement} emailInput - The email input element.
 * @param {HTMLInputElement} passInput - The password input element.
 * @param {Array} usersList - The list of user objects to validate against.
 * @returns {boolean} True if user is valid, otherwise false.
 */
function isUserValid(emailInput, passInput, usersList)
{
    let flag = false;
    const emailToCheck = emailInput.value.toLowerCase();
    const passToCheck = passInput.value;

    for (let i = 0; i < usersList.length; i++)
    {
        if (usersList[i].email.toLowerCase() === emailToCheck &&
            usersList[i].password === passToCheck
           )
        {
            flag = true;
            break;
        }
    }
    return flag;
}

/**
 * Retrieves the valid user's first and last name based on email and password inputs.
 * @param {HTMLInputElement} emailInput - The email input element.
 * @param {HTMLInputElement} passInput - The password input element.
 * @param {Array} usersList - The list of user objects to search.
 * @returns {Object|null} Object with 'fName' and 'lName' properties if valid user found, otherwise null.
 */
function getValidUserName(emailInput, passInput, usersList)
{
    const emailToCheck = emailInput.value.toLowerCase();
    const passToCheck = passInput.value;

    for (let i = 0; i < usersList.length; i++)
    {
        if (usersList[i].email.toLowerCase() === emailToCheck &&
            usersList[i].password === passToCheck
           )
        {
            const fName = usersList[i].firstName.toLowerCase();
            const lName = usersList[i].lastName.toLowerCase();

            return {
                fName: fName,
                lName: lName,
            };
        }
    }
    return null;
}

/**
 * Validates login credentials (email and password).
 * @param {HTMLInputElement} emailInput - The email input element.
 * @param {HTMLInputElement} passInput - The password input element.
 * @returns {boolean} True if login credentials are valid, otherwise false.
 */
function isValidLogIn(emailInput, passInput)
{
    const emailI = emailInput.value;
    const passI = passInput.value;

    if (!emailI || !passI)
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

    return true;
}

/**
 * Resets the values of email and password input fields.
 * @param {HTMLInputElement} emailInput - The email input element.
 * @param {HTMLInputElement} passInput - The password input element.
 */
function resetLogInInput(emailInput, passInput)
{
    emailInput.value = "";
    passInput.value = "";
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
 * Saves the current user object to local storage.
 * @param {Object} currentUser - The current user object to be stored.
 */
function saveCurrentUserToLocalStorage(currentUser)
{
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

/**
 * Handles main form submission and login logic.
 */
(function main()
{
    const form = document.getElementById("mainForm");
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");

    const usersList = getUsersListFromLocalStorage();

    form.addEventListener("submit", stopFormRefresh);

    document.getElementById("logInButton").addEventListener("click", function ()
    {
        const isValidLog = isValidLogIn(emailInput, passInput);
        const userValid = isUserValid(emailInput, passInput, usersList);
        const inValidLogIn = document.getElementById("inValidLogInMsg")

        if (isValidLog == true)
        {
            if(userValid == true)
            {
                inValidLogIn.classList.add("hidden");
                const currentUser = getValidUserName(emailInput, passInput, usersList);
                saveCurrentUserToLocalStorage(currentUser);
                resetLogInInput(emailInput, passInput);
                window.location.replace("assets/html/main.html");
            }
            else
            {
                inValidLogIn.classList.remove("hidden");
            }
            
        }
    });

})();