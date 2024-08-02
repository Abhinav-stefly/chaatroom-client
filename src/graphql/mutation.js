import {gql} from '@apollo/client'

export const SIGNUP_USER = gql`
mutation SignupUser($userNew: UserInput!) {
  signupUser(userNew: $userNew) {
    id
    email
    firstName
    lastName
  }
}
`
export const SIGNIN_USER = gql`
mutation SigninUser($userSignin: UserSigninInput!) {
  signinUser(userSignin: $userSignin) {
  
    token
  }
  
}
`
export const SEND_MESSG = gql`
mutation CreateMessage($receiverId: Int!, $text: String!) {
  createMessage(receiverId: $receiverId, text: $text) {
    id
    receiverId
    senderId
    createdAt
    text
  }
}
`