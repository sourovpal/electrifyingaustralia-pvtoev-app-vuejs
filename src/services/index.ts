import auth from "./auth";
import users from "./users";
import Http from './client';

export default {
    auth: auth,
    users: users,
    error: Http.error,
}