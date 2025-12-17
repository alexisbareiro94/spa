import './login'
import './register'
import { checkAuthAndLoadApp } from './boot';

window.Auth = {
    isAuthenticated: false,
    user: null 
}
checkAuthAndLoadApp().then(() => {});
