import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'TI_API_KEY': import.meta.env.VITE_TOKENSIGHT_API_KEY,
    'accept': 'application/json'
}

const baseURL =  'https://api.tokeninsight.com/api/v1'

export const cryptoNewsApi = createApi({
    reducerPath:"cryptoNewsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:baseURL,
        prepareHeaders: (headers) => {
            headers.set( 'TI_API_KEY', cryptoNewsHeaders[ 'TI_API_KEY']);
            headers.set( 'accept', cryptoNewsHeaders[ 'accept']);
            return headers;
        },
    }),
    endpoints:(builder)=>({
        getCryptoNews:builder.query({
            query:()=>`news/list`
        })
    })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi


