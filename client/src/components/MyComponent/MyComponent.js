import React from 'react';
// import { useQuery, useLazyQuery } from "@apollo/react-hooks";

// import { graphql } from 'react-apollo';
import AllMoviesHoc from './AllMoviesHoc';
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {moviesQuery} from "../MoviesTable/queries";
import {directorsQuery} from "../DirectorsTable/queries";
// import { moviesQuery } from './queries';
// import { directorsQuery } from '../DirectorsTable/queries';


function useAllMovies() {
    const {data, loading} = useQuery(moviesQuery);
    // const {movies = []} = data;

    console.log('data = ', data);
    console.log('loading = ', loading);
    // console.log('movies = ', movies);
    return {movies: data, moviesLoading: loading};
}

function useAllDirectors() {
    const {data, loading} = useQuery(directorsQuery);
    // const {directors = []} = data;
    console.log('data = ', data);
    console.log('loading = ', loading);
    return {directors: data, directorsLoading: loading};
}

const MyComponent = (props) => {
    const {movies, moviesLoading} = useAllMovies();
    const {directors, directorsLoading} = useAllDirectors();
    console.log('movies = ', movies);
    console.log('directors = ', directors);
    // const {data, loading} = useQuery(directorsQuery);
    // const [getData, { loading, data }] = useLazyQuery(graphql(moviesQuery));
    // const [getMovies, { loading, data }] = useLazyQuery(moviesQuery);

    // const handleClick = () => {
    //     getMovies();
    //     console.log('click');
    // };
    //
    // console.log('data = ', data);
    // console.log('loading = ', loading);
    // console.log('directors = ', directors);
    // console.log('directorsLoading = ', directorsLoading);
    console.log('props = ', props);
    return (
        <div onClick={{/*handleClick*/}}>
            MyMoviesTable
        </div>
    );
};

export default MyComponent;
// export default AllMoviesHoc(MyComponent);

