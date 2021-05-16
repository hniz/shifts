import {gql} from '@apollo/client';

const LOGIN_USER = gql`
    query loginUser($email: String!, $password: String!){
        login(email: $email, password: $password) {
            AccessToken
        }
    }
`

const ADD_USER = gql`
    mutation registerUser($username: String!, $userID: ID!){
        addUser(username: $username, userID: $userID){
            userID
            username
            favorites{
              symbol
            }
        }
    }
`

const CHECK_USERNAME = gql`
    query ($username: String!){
        checkUsername(username: $username)
    }
`

const REMOVE_USER = gql`
    mutation removeUser($id: String!){
        deleteUser(id: $id){
            email
        }
    }
`

const GET_ALL_ROOMS = gql`
    query { 
        rooms {
            stockSymbol
            activeUsers {
                username
            }
        }
    }
`

const GET_GAINING_COMPANIES = gql`
    query getGainers($queryNum: Int){
        gainingCompanies(num: $queryNum){
            ticker
            companyName
            _id
        }
    }
`

const GET_LOSING_COMPANIES = gql`
    query getLosers($queryNum: Int){
        losingCompanies(num: $queryNum){
            ticker
            companyName
            _id
        }
    }
`

const GET_LOGGED_IN_USERS = gql`
    query{
        getUsers{
            _id
            username
        }
    }
`

const GET_STOCK_DATA = gql`
    query ($ticker: String!){
        getStock(symbol: $ticker){
            symbol
            prices{
                date
                value
            }
            chart{
                date
                value
            }
        }
    }
`



export default {
  GET_STOCK_DATA, CHECK_USERNAME, LOGIN_USER, ADD_USER, REMOVE_USER, GET_LOGGED_IN_USERS, GET_GAINING_COMPANIES, GET_LOSING_COMPANIES, GET_ALL_ROOMS
}
