import { gql } from '@apollo/client'

export const CREATE_USER = gql(`
    mutation createUser ($email: String!, $password: String!, $username: String!, $displayName: String!, $dob: String!, $profileLocation: String) {
        createUser(email: $email, password: $password, username: $username, displayName: $displayName, dob: $dob, profileLocation: $profileLocation) {
            id,
            email,
            password,
            username,
            displayName,
            dob,
            profileLocation,
            followers,
            following,
            countries,
            listIds,
            groups {
                groupName
                memberProfiles {
                    id,
                    username,
                    displayName,
                    dob,
                    profileLocation,
                    followers,
                    following,
                    countries,
                    listIds
                }
            }
        }
    }
`)
