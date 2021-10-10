import axios from "axios";
import {useLocation} from "react-router-dom";

const apiUrl = "http://localhost:8080"
const config = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
};

let location = useLocation;

export class Api {

    

    static invalidateSession(){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        //this.logout();
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

    static put(url,body) {
        return axios.put(apiUrl + url,body,config)
        .then(
            response => {
                return response;
            }
        );
    }

    static delete(url) {
        return axios.delete(apiUrl + url,config)
        .then(
            response => {
                return response;
            }
        );
    }

    //=====
   
    static login(body){
        return this.post("/api/users/login",body)

    }

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

    static addActivity(body){
        return this.post("/api/activities/add",body)
    }

    static addUserActivity(body){
        return this.post("/api/users/addActivity",body)
    }

    static levels(){
        return this.get("/api/levels");
    }

    static addEvent(body){
        return this.post("/api/events/add",body)

    }
    //Add participant
    static addParticipant(body){
        return this.post("/api/events/participant/add",body)
    }

    static acceptParticipant(id){
        return this.put(`/api/events/participant/${id}/accept`);
    }

    static rejectParticipant(id){
        return this.delete(`/api/events/participant/${id}/reject`);
    }

    static connectToGoogleCal(){
        return this.get(`/api/google`)
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