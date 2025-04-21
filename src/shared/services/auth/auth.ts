import { userLocalData } from "../userData";

const checkAuth = {
    isAuthenticated: false,
    userName: userLocalData.getvalue('userName'),
    signIn(callback: VoidFunction) {
        checkAuth.isAuthenticated = true;
        checkAuth.userName = userLocalData.getvalue('userName');
        setTimeout(callback, 100); // fake async
    },
    signOut(callback: VoidFunction) {
        checkAuth.isAuthenticated = false;
        checkAuth.userName = '';
        localStorage.removeItem('demoUserInfo');
        setTimeout(callback, 100);
    },
    checkSignIn() {
        return checkAuth.isAuthenticated
    }
};
if (userLocalData.getvalue('userName')) {
    checkAuth.isAuthenticated = true;
    checkAuth.userName = userLocalData.getvalue('userName');
}

export { checkAuth };