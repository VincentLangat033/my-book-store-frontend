export const deleteRating = ( id ) => {
    return fetch(`ratings/${id}`, {
        method: "DELETE",
    })
}

export const createNewRating = (data) => {
    return fetch("/ratings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then(rating => rating)
        .catch(error => alert(error.message))
}

export const updateRating = (data) => {
    return fetch(`ratings/${data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(r => r.json())
    .then(rating => (rating))
    .catch(error => alert(error.message))
}

export const fetchAllRatings = () => {
    return fetch("/ratings")
        .then(response => response.json())
        .then(ratings => ratings) 
        .catch(error => alert(error.message))
}

export const fetchMyRatings = () => {
    return fetch("/myratings")
        .then(response => response.json())
        .then(myratings => myratings) 
        .catch(error => alert(error.message))
}