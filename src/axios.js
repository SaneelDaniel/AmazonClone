import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-react-ecom-template.cloudfunctions.net/api'
    
    
    // localhost >>> 'http://localhost:5001/react-ecom-template/us-central1/api'
    //The API (CLOUD FUNCTION) URL
});

export default instance; 