export const updateBookshelf = ( data) => {
    return fetch(`bookshelves/${data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(r => r.json())
    .then(r => (r))
    .catch(error => alert(error.message))
}

export const deleteBookshelf = ( id ) => {
    return fetch(`bookshelves/${id}`, {
        method: "DELETE",
    })
}