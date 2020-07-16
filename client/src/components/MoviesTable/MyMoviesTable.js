import React from 'react';

import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import { graphql } from 'react-apollo';
import { moviesQuery } from './queries';
import { directorsQuery } from '../DirectorsTable/queries';

export default () => {
    // const {data, loading} = useQuery(directorsQuery);
    // const [getData, { loading, data }] = useLazyQuery(graphql(moviesQuery));
    const [getMovies, { loading, data }] = useLazyQuery(moviesQuery);

    const handleClick = () => {
        getMovies();
        console.log('click');
    };

    console.log('data = ', data);
    console.log('loading = ', loading);
    // console.log('directors = ', directors);
    // console.log('directorsLoading = ', directorsLoading);
    return (
        <div onClick={handleClick}>
            MyMoviesTable
        </div>
    );
};
