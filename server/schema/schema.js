const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
} = require('graphql');

const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        genre: {
            type: new GraphQLNonNull(GraphQLString),
        },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                // console.log('parent.directorId = ', parent.directorId);
                // console.log('Directors.findById(parent.directorId) = ', (parent.directorId ? Directors.findById(parent.directorId) : null));
                return parent.directorId ? Directors.findById(parent.directorId) : null;
            },
        },
        rate: {
            type: GraphQLInt,
        },
        watched: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({directorId: parent.id});
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Movies.findById(args.id);
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({});
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Directors.findById(args.id);
            },
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return Directors.find({});
            },
        },
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
            },
            resolve(parent, args) {
                const director = new Directors({
                    name: args.name,
                    age: args.age,
                });

                return director.save();
            },
        },
        removeDirector: {
            type: DirectorType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            async resolve(parent, args) {
                Movies.updateMany({ directorId: args.id }, { directorId: '' }).exec();

                return Directors.findByIdAndRemove(args.id);
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: {
                    type: GraphQLID,
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
            },
            resolve(parent, args) {
                return Directors.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            age: args.age,
                        },
                    },
                    {
                        new: true,
                    },
                );
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                directorId: {
                    type: GraphQLID,
                },
                rate: {
                    type: GraphQLInt,
                },
                watched: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                },
            },
            resolve(parent, args) {
                const movie = new Movies({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId,
                    rate: args.rate,
                    watched: args.watched,
                });

                return movie.save();
            },
        },
        removeMovie: {
            type: MovieType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Movies.findByIdAndRemove(args.id);
            },
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: {
                    type: GraphQLID,
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                directorId: {
                    type: GraphQLID,
                },
                rate: {
                    type: GraphQLInt,
                },
                watched: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                },

            },
            resolve(parent, args) {
                return Movies.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            genre: args.genre,
                            directorId: args.directorId,
                            rate: args.rate,
                            watched: args.watched,
                        },
                    },
                    {
                        new: true,
                    },
                );
            }
        },
    },
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
