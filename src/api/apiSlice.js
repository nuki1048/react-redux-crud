import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64381329c1565cdd4d65807f.mockapi.io",
  }),
  tagTypes: ["Heroes", "Filters"],
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: () => "/heroes",
      providesTags: ["Heroes"],
    }),
    createHero: builder.mutation({
      query: (hero) => ({
        url: "/heroes",
        method: "POST",
        body: hero,
      }),
      invalidatesTags: ["Heroes"],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Heroes"],
    }),
    getFilters: builder.query({
      query: () => "/filters",
      providesTags: ["Filters"],
    }),
  }),
});
export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useGetFiltersQuery,
} = apiSlice;
