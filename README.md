# Uptive

The purpose of the work was to develop and implement application that will allow to perform sport activities management inside the group. 

The application is an example of web application based on a three-layer architecture using REST API for interlayer communication. 

It is intended for users who need help in arranging team sport activities. It allows to unite groups with similar sport preferences, created meetings and organize a day schedule, thanks to the integration with Google calendar.


## Main technologies:

* Spring Boot (Java 15)
* React (JavaScript)
* PostgreSQL

## Database backend configuration to be set:

*server/src/main/resources/application.yml*

    username: { username }  
    url: { database_url }  
    password: { password }  


## Google API configuration to be set:

*client/src/const/const.js*
    
    export const CLIENT_ID = {GOOGLE_CLIENT_ID}  
    export const API_KEY = {GOOGLE_API_KEY}