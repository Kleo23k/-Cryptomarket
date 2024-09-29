import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoExchangesHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_COINGECKO_API_KEY,
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
}

const baseURL =  'https://coingecko.p.rapidapi.com'

export const cryptoExchanges = createApi({
    reducerPath:" cryptoExchanges",
    baseQuery:fetchBaseQuery({
        baseUrl:baseURL,
        prepareHeaders: (headers) => {
            headers.set( 'X-RapidAPI-Key', cryptoExchangesHeaders[ 'X-RapidAPI-Key']);
            headers.set( 'X-RapidAPI-Host', cryptoExchangesHeaders[ 'X-RapidAPI-Host']);
            return headers;
        },
    }),
    endpoints:(builder)=>({
        getExchanges:builder.query({
            query:()=>`/exchanges?per_page=50&page=1`
        }),
        getExchangesDetails:builder.query({
            query:(exchangeid)=>`/exchanges/${exchangeid}`
        })
    })
})

export const {useGetExchangesQuery,useGetExchangesDetailsQuery} = cryptoExchanges
