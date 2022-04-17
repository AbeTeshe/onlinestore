import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ["Products", "UserProfile" , "Orders" ],
  endpoints: (builder) => ({

    //PRODUCTS API's
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query : (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query(product) {
        return {
          url: "/products",
          method: "POST",
          body: product,
        }
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/products/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query(data) {
        const {id, ...body} = data;
        return {
          url: `/products/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ["Products"],
    }),


    //USER PROFILES API's
    getUserProfiles: builder.query({
      query: () => "/userProfiles",
      providesTags: ["UserProfile"],
    }),
    getUserProfile: builder.query({
      query: (id) => `/userProfiles/${id}`,
      providesTags: ["UserProfile"],
    }),
    addUserProfile: builder.mutation({
      query(userProfile) {
        return {
          url: "/userProfiles",
          method: "POST",
          body: userProfile,
        }
      },
      invalidatesTags: ["UserProfile"],
    }),
    deleteUserProfile: builder.mutation({
      query(id) {
        return {
          url: `/userProfiles/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ["UserProfile"],
    }),
    updateUserProfile: builder.mutation({
      query(data) {
        const {id, ...body} = data;
        return {
          url: `/userProfiles/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ["UserProfile"],
    }),

    

    //ORDERS API's
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"]
    }),
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Orders"]
    }),
    addOrder: builder.mutation({
      query(order) {
        return {
          url: "/orders",
          method: "POST",
          body: order,
        }
      },
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `/orders/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query(data) {
        const {id, ...body} = data;
        return {
          url: `/orders/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ["Orders"],
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductQuery, useAddProductMutation, 
  useDeleteProductMutation, useUpdateProductMutation,
  useGetUserProfilesQuery, useGetUserProfileQuery, useAddUserProfileMutation,
   useDeleteUserProfileMutation, useUpdateUserProfileMutation,
  useGetOrdersQuery, useGetOrderQuery, useAddOrderMutation, useDeleteOrderMutation, useUpdateOrderMutation } = apiSlice;