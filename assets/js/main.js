/**
 * Retrieves current user's name from local storage.
 * @returns {Object|Array} User information if available, or empty array.
 */
function getCurrentUserName()
{
    const storedCurrentUserName = localStorage.getItem('currentUser');
    return storedCurrentUserName ? JSON.parse(storedCurrentUserName) : [];
}

/**
 * Main function to handle user interface interactions.
 */
(function main()
{
    // Retrieve DOM elements
    const userNameMsg = document.getElementById("userName");
    const currentUser = getCurrentUserName();
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    const firstName = capitalize(currentUser.fName);
    const lastName = capitalize(currentUser.lName);
    const imgs = document.querySelectorAll(".gallery img");
    const imgsArray = Array.from(document.querySelectorAll(".gallery img"));
    const modalImg = document.querySelector(".img-box img");
    const productModal = document.getElementById("productModal");
    const closeButton = document.getElementById("closeBtn");
    const nextButton = document.getElementById("nextBtn");
    const prevButton = document.getElementById("prevBtn");
    const stopScrolly = document.getElementById("mainBody")

    // Display the user's name in the designated message element
    userNameMsg.innerHTML = 
    `
    ${firstName} ${lastName}
    `;
    
    // Event listener for each image in the gallery
    for (let i = 0; i < imgsArray.length; i++)
    {
        imgsArray[i].addEventListener("click", function ()
        {
            productModal.classList.remove('hidden');
            stopScrolly.classList.add('overflow-y');
            modalImg.src = imgsArray[i].src;
        });
    }

    // Event listener for the "Next" button
    nextButton.addEventListener("click", function ()
    {
        const currentIndex = imgsArray.findIndex(img => img.src === modalImg.src);

        if (currentIndex < imgsArray.length - 1)
        {
            modalImg.src = imgsArray[currentIndex + 1].src;
        }
        else
        {
            modalImg.src = imgsArray[0].src;
        }
    });

    // Event listener for the "Previous" button
    prevButton.addEventListener("click", function ()
    {
        const currentIndex = imgsArray.findIndex(img => img.src === modalImg.src);

        if (currentIndex > 0)
        {
            modalImg.src = imgsArray[currentIndex - 1].src;
        }
        else
        {
            modalImg.src = imgsArray[imgsArray.length - 1].src;
        }
    });

    // Event listener for the "Close" button
    closeButton.addEventListener("click", function ()
    {
        productModal.classList.add('hidden');
        stopScrolly.classList.remove('overflow-y');
    });

    // Event listener to close modal on outside click
    document.addEventListener('mouseup', function(e)
    {
        const modalContent = document.getElementById("imgBox");

        if (!modalContent.contains(e.target))
        {
            productModal.classList.add('hidden');
            stopScrolly.classList.remove('overflow-y');
        }
    });
})();