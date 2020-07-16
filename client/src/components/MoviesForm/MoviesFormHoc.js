import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { styles } from './styles';
import { addMovieMutation, updateMovieMutation } from '../MoviesForm/mutations';
import { moviesQuery } from '../MoviesTable/queries';
import { directorsQuery } from '../DirectorsTable/queries';

const withGraphqlAdd = graphql(addMovieMutation, {
    props: ({ mutate }) => ({
        addMovie: movie => mutate({
            variables: movie,
            refetchQueries: [
                {
                    query: moviesQuery,
                },
            ],
        }),
    }),
});

const withGraphqlUpdate = graphql(updateMovieMutation, {
    props: ({ mutate }) => ({
        updateMovie: movie => mutate({
            variables: movie,
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

export default compose(withStyles(styles), graphql(directorsQuery), withGraphqlAdd, withGraphqlUpdate);