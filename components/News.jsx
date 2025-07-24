"use client";
import React, { useEffect, useState } from 'react';

const News = () => {
    const [news, setNews] = useState([]);
    const [articleNum, setArticleNum] = useState(3);

    useEffect(() => {
        fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/in.json')
            .then((res) => res.json())
            .then((data) => setNews(data.articles));
    }, []);

    return (
        <div className='text-gray-700 dark:text-gray-200 space-y-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl pt-2'>
            <h4 className='font-bold text-xl px-4'>What's happening?</h4>
            {news.slice(0, articleNum).map((article) => (
                <div key={article.url}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-200'>
                            <div className='space-y-0.5'>
                                <h6 className='text-sm font-bold'>{article.title}</h6>
                                <p className='text-xs font-medium text-gray-500 dark:text-gray-400'>{article.source.name}</p>
                            </div>
                            <img src={article.urlToImage} width={70} className='rounded-t-xl' />
                        </div>
                    </a>
                </div>
            ))}
            <button
                onClick={() => setArticleNum(articleNum + 3)}
                className='text-blue-400 pl-4 pb-3 hover:text-blue-500 text-sm cursor-pointer'
            >
                Load more...
            </button>
        </div>
    );
};

export default News;
