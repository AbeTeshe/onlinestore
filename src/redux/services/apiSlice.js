import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Product', 'UserProfile', 'Order', 'Invoice'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ['Product'],
    }),
    getProduct: builder.query({
      query : (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation({
      query(product) {
        return {
          url: "/products",
          method: "POST",
          body: product,
        }
      },
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/products/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Product'],
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
      invalidatesTags: ['Product'],
    }),
    getUserProfiles: builder.query({
      query: () => "/userProfiles",
      providesTags: ['UserProfile'],
    }),
    getUserProfile: builder.query({
      query: (id) => `/userProfiles/${id}`,
      providesTags: ['UserProfile'],
    }),
    addUserProfile: builder.mutation({
      query(userProfile) {
        return {
          url: "/userProfiles",
          method: "POST",
          body: userProfile,
        }
      },
      invalidatesTags: ['UserProfile'],
    }),
    deleteUserProfile: builder.mutation({
      query(id) {
        return {
          url: `/userProfiles/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['UserProfile'],
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
      invalidatesTags: ['UserProfile'],
    }),
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ['Order']
    }),
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ['Order']
    }),
    addOrder: builder.mutation({
      query(order) {
        return {
          url: "/orders",
          method: "POST",
          body: order,
        }
      },
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `/orders/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Order'],
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
      invalidatesTags: ['Order'],
    }),
    getInvoices: builder.query({
      query: () => "/invoices",
      providesTags: ['Invoice']
    }),
    getInvoice: builder.query({
      query: (id) => `/invoices/${id}`,
      providesTags: ['Invoice']
    }),
    addInvoice: builder.mutation({
      query(invoice) {
        return {
          url: "/invoices",
          method: "POST",
          body: invoice,
        }
      },
      invalidatesTags: ['Invoice'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductQuery, useAddProductMutation, 
  useDeleteProductMutation, useUpdateProductMutation,
  useGetUserProfilesQuery, useGetUserProfileQuery, useAddUserProfileMutation,
   useDeleteUserProfileMutation, useUpdateUserProfileMutation,
  useGetOrdersQuery, useGetOrderQuery, useAddOrderMutation, useDeleteOrderMutation, useUpdateOrderMutation,
  useGetInvoiceQuery, useGetInvoicesQuery, useAddInvoiceMutation
 } = apiSlice;