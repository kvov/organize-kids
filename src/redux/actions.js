export function saveData(photo, userName) {
    return {
        type: "SAVE_DATA",
        payload: {
            photo: photo,
            userName: userName
        }
    }
}

export function onFileLoaded (photo) {
    return {
        type: "LOAD_FILE",
        payload: {
            photo: photo
        }
    }
}
// export function getPhoto() {
//     return function (dispatch) {
//         fetch(`http://www.`)
//         .then((res) => res.json())
//         .then((data) => {
//             dispatch(savePhoto(data));
//         });
//     };
// }