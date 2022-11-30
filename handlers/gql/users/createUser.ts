import { gql } from '@apollo/client'

export const CREATE_USER = gql(`
    mutation createUser ($email: String!, $password: String!, $username: String!, $displayName: String!, $dob: String!, $profilePicture: String) {
        createUser(email: $email, password: $password, username: $username, displayName: $displayname, dob: $dob, profilePicture: $profilePicture) {
            id,
            email,
            password,
            username,
            displayName,
            dob,
            profilePicture,
            followers
            following
        }
    }
`)
