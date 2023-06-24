// to ensure header runs on each HTML page
fetch('header.html')
    // then is a type of method that works with js promises to handle asynchronous operations. Then executes the next steps once the promise is resolved (ie when it successfully completes task)
    // response.text extracts content from requested page in plain text to bring header to the pages its called
    .then(response => response.text())
    .then(content => {
        const headerElement = document.getElementById('header');
        headerElement.innerHTML = content;
    })
    // catch handles errors that happen while fetching header while console.error prints the error into the console for debugging
    .catch(error => {
        console.error('Error loading header:', error);
    });