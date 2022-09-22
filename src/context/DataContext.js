import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const { data, fetchError, isLoading } = useAxiosFetch(
        "http://localhost:3500/posts"
    );

    useEffect(() => {
        setPosts(data);
    }, [data]);

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(filteredResults.reverse());
    }, [posts, search]);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await api.get(`/posts`);
    //             setPosts(response.data);
    //         } catch (err) {
    //             if (err.response) {
    //                 // ! Not in the 200 response range
    //                 console.log(err.response.data);
    //                 console.log(err.response.status);
    //                 console.log(err.response.headers);
    //             } else {
    //                 console.log(`Error: ${err.message}`);
    //             }
    //         }
    //     };

    //     fetchPosts();
    // }, []);

    return (
        <DataContext.Provider
            value={{
                search,
                setSearch,
                searchResult,
                fetchError,
                isLoading,
                posts,
                setPosts,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
