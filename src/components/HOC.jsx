import React from 'react';
import { useDispatch } from "react-redux";
import {setAppPage, setPage} from "../redux/reducers/stateSlices";
import { addItemToCart } from '../redux/reducers/cartSlice';

import {toast} from "react-toastify";

const HOC = OriginalComponent => {
    const NewComponent = (props) => {
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
            />
    }
    return NewComponent;
}

export default HOC;