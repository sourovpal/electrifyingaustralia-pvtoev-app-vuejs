import auth from "./auth";
import users from "./users";
import tasks from "./tasks";
import Http from './client';
import leads from "./leads";
import contacts from "./contacts";
import notification from "./notification";

export default {
    auth,
    tasks,
    leads,
    contacts,
    users,
    notification,
    error: Http.error,
}