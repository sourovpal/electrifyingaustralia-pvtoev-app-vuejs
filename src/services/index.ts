import auth from "./auth";
import users from "./users";
import tasks from "./tasks";
import Http from './client';
import leads from "./leads";
import contacts from "./contacts";

export default {
    auth,
    tasks,
    leads,
    contacts,
    users,
    error: Http.error,
}