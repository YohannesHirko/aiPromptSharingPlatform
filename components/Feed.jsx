"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => (
    <div className="mt-16 propt_layout">
        {data.map((post) => (
            <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
            />
        ))}
    </div>
);

function Feed() {
    const [searchText, setSearchState] = useState();
    const [posts, setPosts] = useState([]);
    const handleSearchChange = (e) => {};
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();

            setPosts(data);
        };
        fetchPosts();
    }, []);
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer"
                />
            </form>
            <PromptCardList data={posts} handleTagClick={() => {}} />
        </section>
    );
}

export default Feed;
