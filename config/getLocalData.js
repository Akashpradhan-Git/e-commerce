export const getToken = () => {
    let token = null
    if (typeof window !== 'undefined') {
        token = JSON.parse(localStorage.getItem('user'));
    }
    return token;
}

// FIXME:  Remove it after testing and store userName in state
//  get user name from local storage 

export const getUserName = () => {
    let userName = null
    if (typeof window !== 'undefined') {
        userName = JSON.parse(localStorage.getItem('userName'));
    }
    return userName;
}