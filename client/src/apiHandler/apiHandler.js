import axios from "axios";

const apiUrl = "http://localhost:8080"
const config = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

export class Api {

    

    static invalidateSession(){
        alert("403 Unauthorized");
        // localStorage.removeItem('token');
        //this.logout();
    }

    //TODO logout backend
    static logout(){
        return this.post("/api/auth/logout")

    }

    static checkStatus(response){
        if(response.status === 403)
           this.invalidateSession();
    }

    //=====BASIC
    static get(url) {
        return axios.get(apiUrl + url, config)
        .then(
            response => {
                return response;
            }
        );
    }

    static post(url, body) {
        return axios.post(apiUrl + url, body, config)
        .then(
            response => {
                return response;
            }
        );
    }

    //=====
    static me() {
        return this.get("/api/users/me");
    }

    
    static users() {
        return this.get("/api/users");
    }

    static getUser(id){
        return this.get(`/api/users/${id}`);
    }

    static events() {
        return this.get("/api/events");
    }

    //EventForm
    static activities(){
        return this.get("/api/activities");
    }

    static levels(){
        return this.get("/api/levels");
    }

    static addEvent(body){
        this.post("/api/events/add",body)

    }

}
/*
    Api.me().then(response => {
        //obsługa jeźeli wszystko poszło ok
        //response.status nadal może być różny od 200, więc coś poszło nie tak
    }).catch(info => {
        //obsługa jeżeli coś się popsuło
    })

*/