import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { deleteDirectorMutation } from './mutation';
import { directorsQuery } from '../DirectorsTable/queries';
import { moviesQuery } from '../MoviesTable/queries';


const withGqaphqlDelete = graphql(deleteDirectorMutation, {
    props: ({ mutate }) => ({
        deleteDirector: id => mutate({
            variables: id,
            refetchQueries: [
                {
                    query: directorsQuery,
                },
                {
                    query: moviesQuery,
                },
            ],
        }),
    }),
});

export default compose(withGqaphqlDelete);