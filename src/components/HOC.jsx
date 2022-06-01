import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {setAppPage, setPage} from "../redux/reducers/stateSlices";
import { addItemToCart } from '../redux/reducers/cartSlice';
import {useGetUserProfilesQuery} from "../redux/services/apiSlice";

import {toast} from "react-toastify";

const HOC = OriginalComponent => {
    const NewComponent = (props) => {
    
        //DATA'S FOR SINGLE USER 
        const user = useSelector((state) => state.auth.authData);
        const {data: userProfiles} = useGetUserProfilesQuery();
        //const {googleId} = user?.result;
        const userProfile = userProfiles?.find((profile) => profile?.userId === user?.result?.googleId)
        const id = userProfile?._id;

        const dispatch = useDispatch();

        const handleAppPage = (page) => {
            dispatch(setAppPage(page))
        }

        const handleAdminPage = (page) => {
            dispatch(setPage(page))
        }

        const onAddToCart = (product) => {
            dispatch(
                addItemToCart({
                    id : product?._id,
                    name: product?.name,
                    price: Number(product?.price),
                    image: product?.mediaUrl,
            })
          )
          toast.success(`${product?.name} added to cart!`);
        }

        return <OriginalComponent 
            onAddToCart={onAddToCart} {...props} 
            handleAppPage={handleAppPage}
            handleAdminPage={handleAdminPage}
            id={id}
            userProfile={userProfile}
            user={user}
            />
    }
    return NewComponent;
}

export default HOC;