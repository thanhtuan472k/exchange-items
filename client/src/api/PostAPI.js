import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PostAPI() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);

  // exchange item
  const addExchange = async (post) => {
    
  }
  // get posts
  useEffect(() => {
    const getPosts = () => {
      setLoading(true)
      axios.get(
        `/api/posts?limit=${
          page * 10
        }&${category}&${sort}&title[regex]=${search}`
      ).then((res) => {
        setLoading(false);
        setPosts(res.data.posts);
        setResult(res.data.length);
      })
    };
    getPosts();
  }, [callback, category, sort, search, page]);

  // get categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };
    getCategories();
  }, [callback]);

  return {
    posts: [posts, setPosts],
    categories: [categories, setCategories],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    loading: [loading, setLoading],
  };
}
