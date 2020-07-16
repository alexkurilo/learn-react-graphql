import { gql } from 'apollo-boost';

export const deleteDirectorMutation = gql`
    mutation removeDirector($id: ID) {
        removeDirector(id: $id) {
            id
        }
    }
`;