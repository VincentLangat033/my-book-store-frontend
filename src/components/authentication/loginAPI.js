
export const fetchCurrentUser = () => {
    return fetch("/me")
        .then(response => response.json())
        .then(user => user) 
        .catch(error => alert(error.message))
}

export const loginNewUser =( { username, password }) => {
    return fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        })
        .then((response) => response.json())
        .then(user => user)
        .catch(error => alert(error.message))   
}

export const logoutCurrentUser = () => {
    return fetch("/logout", {
        method: "DELETE"
    }).catch(error => alert(error.message))
}

export const signupNewUser = ( { username, email, password, password_confirmation } ) => {
    return fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, password, password_confirmation}),
         })
        .then((response) => response.json())
        .then(newUser => newUser)
        .catch(error => alert(error.message))  
         }
      