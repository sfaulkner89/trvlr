import { gql } from '@apollo/client'

export const PUTCONTACT = gql(`
    mutation putContact ($userId: String!, $contactIds: [String]!, $groupName: String, $visible: Boolean) {
        putContact(userId: $userId, contactIds: $contactIds, groupName: $groupName, visible: $visible) {
            id
        }
    }
`)
