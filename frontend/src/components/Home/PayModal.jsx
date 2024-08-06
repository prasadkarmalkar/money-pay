import React, { useContext, useState } from 'react';
import { UserContext } from '../../utils/userContext';
import { IoIosSend } from 'react-icons/io';
import { BsCurrencyRupee, BsThreeDots } from 'react-icons/bs';
import gradientback from '../../assets/images/gradientback.webp';
function PayModal({balance}) {
    const {user} = useContext(UserContext);

	const [showEmail, setShowEmail] = useState(false);

    const [ payProcessing, setPayProcessing ] = useState(false);

    const [payForm, setPayForm] = useState({
		to: '',
		amount: 0,
        description: '',
	});
	const [formErrors, setFormErrors] = useState({
		error: null,
        success: null,
	});

    const handleFieldChange = (e) => {
        let value = e.target.value;
        if (e.target.id === 'amount') {
            value = parseInt(value);
        }
		setPayForm({...payForm, [e.target.id]: value});
	}

    const handlePayForm = async (e) => {
        e.preventDefault();
        setPayProcessing(true);
        fetch( `${import.meta.env.VITE_SERVER_URL}api/v1/account/transfer`, {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_key')}`
			},
			body: JSON.stringify(payForm),
		} ).then( async request => {
			const response = await request.json();
			if( request.status === 201 ) {
				setPayForm({
                    to: '',
                    amount: 0,
                    description: '',
				});
				setFormErrors({
                    success: response.message,
				});
			} else {
				setFormErrors({error: response.message});
			}
		} ).catch((e)=>{
			console.log(e);
			setFormErrors({error: 'Something went wrong! Please try again.'});
		}).finally(()=>{
            setPayProcessing(false);
        })
    }
	return (
		<form onSubmit={handlePayForm} className=' w-full p-10 rounded-3xl shadow-md mt-16 max-w-[650px] bg-white dark:bg-gray-900'>
			<div className='relative h-48 w-full max-w-96 mx-auto shadow-lg rounded-3xl p-1 -mt-24 text-white'>
				<img className='absolute w-full rounded-3xl h-full top-0 bottom-0 left-0 right-0' src={gradientback} />
				<div className='relative top-10'>
					<p className='text-center tracking-widest font-semibold'>
						{user._id}
					</p>
					<h3 className='mt-5 ml-6 font-semibold text-2xl flex items-center'><BsCurrencyRupee /> {balance}</h3>
					<h4 className={`mt-5 ml-6 font-bold flex justify-between items-center mr-5 ${showEmail ? 'tracking-normal text-sm' : 'tracking-wider uppercase'}`}>{showEmail ? user.email : user.firstName + ' ' + user.lastName} <span className='capitalize text-xs tracking-normal font-normal border border-white px-1 rounded-md py-0.5 cursor-pointer' onClick={()=> setShowEmail(!showEmail)}>{showEmail ? 'Show Name' : 'Show Email'}</span></h4>
				</div>
			</div>

			<h4 className='text-center font-semibold text-xl mt-12'>
				Transaction
			</h4>
			<div></div>
			<div className='mt-5'>
				<label htmlFor='to'>Pay to</label>
				<input
					className='block w-full rounded-xl px-10 py-2 bg-gray-200 dark:bg-gray-700'
					type='email'
					name='to'
					id='to'
                    value={payForm.to}
                    onChange={handleFieldChange}
                    required
				/>
				<p className='text-xs text-center'>
					Please enter the valid email address
				</p>
			</div>
			<div className='flex gap-5 mt-5	justify-between'>
				<div>
					<label htmlFor='amount'>Amount</label>
					<input
						className='block w-full rounded-xl px-2 py-2 bg-gray-200 dark:bg-gray-700'
						type='number'
						name='amount'
						id='amount'
                        value={payForm.amount}
                        onChange={handleFieldChange}
                        required
					/>
				</div>
				<div>
					<label htmlFor='reason'>Reason</label>
					<input
						className='block w-full rounded-xl px-2 py-2 bg-gray-200 dark:bg-gray-700'
						type='text'
						name='description'
						id='description'
                        value={payForm.description}
                        onChange={handleFieldChange}
					/>
				</div>
			</div>
			<button disabled={payProcessing && true} type='submit' className='mt-5 flex justify-center rounded-lg p-1 items-center gap-2 text-lg text-center w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 font-semibold'>
				{payProcessing ? <BsThreeDots /> : <><IoIosSend /> Send</>}
			</button>
            <div className='text-sm text-red-500 text-center'>{formErrors.error && formErrors.error}</div>
            <div className='text-sm text-green-500 text-center'>{formErrors.success && formErrors.success}</div>
		</form>
	);
}

export default PayModal;
