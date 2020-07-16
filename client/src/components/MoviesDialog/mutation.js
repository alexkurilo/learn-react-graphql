import { gql } from 'apollo-boost';

export const deleteMovieMutation = gql`
    mutation removeMovie($id: ID) {
        removeMovie(id: $id) {
            id
        }
    }
`;