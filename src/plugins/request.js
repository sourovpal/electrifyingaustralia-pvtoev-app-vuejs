import { useApiRequest } from '../actions/api';
export default {
    install(app) {
        app.config.globalProperties.$apiRequest = useApiRequest;
    }
};
