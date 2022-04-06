// Done

import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseEmail, chooseAddress, choosePhone } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

// import { useGetData } from '../../custom-hooks';

// Where do we get this from?
interface ItemFormProps {
    id?: string;
    data?: {}
}

interface ItemState {
    name: string;
    email: string;
    address: string;
    phone_number: string;
}

export const ItemForm = (props: ItemFormProps) => {
    // ask Joel about itemData and state
    const dispatch = useDispatch();
    // let { itemData, getData } = useGetData();
    const store = useStore();
    const name = useSelector<ItemState>(state => state.name);
    const { register, handleSubmit } = useForm({})

    const onSubmit = (data: any, event: any) => {
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if (props.id!) {
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout(() => { window.location.reload() }, 1000);
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseName(data.name));
            dispatch(chooseEmail(data.email));
            dispatch(choosePhone(data.phone_number));
            dispatch(chooseAddress(data.address));
            server_calls.create(store.getState());
            setTimeout(() => { window.location.reload() }, 1000)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Item Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('email')} name="description" placeholder='Description' />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <Input {...register('city')} name="city" placeholder='Phone Number' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}
