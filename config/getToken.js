const getToken = () => {
    let token = null
    if (typeof window !== 'undefined') {
        token = JSON.parse(localStorage.getItem('user'));
    }
    return token;
}
export default getToken;
