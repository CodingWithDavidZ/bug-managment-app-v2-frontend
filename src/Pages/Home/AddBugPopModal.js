import React, {useRef, useState, useEffect} from 'react'
import Dropdown from '../../Components/Dropdown';


function AddBugPopModal() {
	const [isVisible, setIsVisible] = useState(false)

    const modalRef = useRef(null);

	function visible() {
		if (isVisible) {
			return 'py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute inset-0 ';
		} else {
			return 'py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute inset-0 hidden';
		}
	}

	function changeVisible() {
		setIsVisible(!isVisible);
	}

    let passedArray = [
			// { option: 'noSelection', value: null, display: defaultLabel },
			{ option: 'option1', value: 'value1', display: 'Turtle 1' },
			{ option: 'option2', value: 'value2', display: 'Turtle 2' },
			{ option: 'option3', value: 'value3', display: 'Turtle 3' },
			{ option: 'option4', value: 'value4', display: 'Turtle 4' },
			{ option: 'noSelection', value: 'value5', display: '' },
		];

  return (
		<div>
			<button
				className='focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded'
				onClick={changeVisible}
			>
				<p className='text-sm font-medium leading-none text-white'>Add Bug</p>
			</button>
			<dh-component>
				<div className={visible()} id='modal' ref={modalRef}>
					<div
						role='alert'
						className='container mx-auto w-11/12 md:w-2/3 max-w-lg'
					>
						<div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
							<div className='w-full flex justify-start text-gray-600 mb-3'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon icon-tabler icon-tabler-wallet'
									width='52'
									height='52'
									viewBox='0 0 24 24'
									strokeWidth='1'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' />
									<path d='M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12' />
									<path d='M20 12v4h-4a2 2 0 0 1 0 -4h4' />
								</svg>
							</div>
							<h1 className='text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4'>
								Enter Bug Details
							</h1>
							<label
								htmlFor='name'
								className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
							>
								Title
							</label>
							<input
								id='name'
								type='text'
								className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
								placeholder='Enter Title That Summarizes Bug'
							/>
							<label
								htmlFor='name'
								className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
							>
								Description of Bug
							</label>
							<textarea
								className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								id='exampleFormControlTextarea1'
								rows='3'
								placeholder='Detailed Explanation of Bug'
							/>
							<label
								htmlFor='email2'
								className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
							>
								Priority
							</label>
							<Dropdown />
							<label
								htmlFor='expiry'
								className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
							>
								Expiry Date
							</label>
							<div className='relative mb-5 mt-2'>
								<div className='absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='icon icon-tabler icon-tabler-calendar-event'
										width='20'
										height='20'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path stroke='none' d='M0 0h24v24H0z' />
										<rect x='4' y='5' width='16' height='16' rx='2' />
										<line x1='16' y1='3' x2='16' y2='7' />
										<line x1='8' y1='3' x2='8' y2='7' />
										<line x1='4' y1='11' x2='20' y2='11' />
										<rect x='8' y='15' width='2' height='2' />
									</svg>
								</div>
								<input
									id='expiry'
									className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
									placeholder='MM/YY'
								/>
							</div>
							<label
								htmlFor='cvc'
								className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
							>
								CVC
							</label>
							<div className='relative mb-5 mt-2'>
								<div className='absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='icon icon-tabler icon-tabler-info-circle'
										width='20'
										height='20'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path stroke='none' d='M0 0h24v24H0z'></path>
										<circle cx='12' cy='12' r='9'></circle>
										<line x1='12' y1='8' x2='12.01' y2='8'></line>
										<polyline points='11 12 12 12 12 16 13 16'></polyline>
									</svg>
								</div>
								<input
									id='cvc'
									className='mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
									placeholder='MM/YY'
								/>
							</div>
							<div className='flex items-center justify-start w-full'>
								<button className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'>
									Submit
								</button>
								<button
									className='focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm'
									onClick={changeVisible}
								>
									Cancel
								</button>
							</div>
							<button
								className='cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600'
								onClick={changeVisible}
								aria-label='close modal'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon icon-tabler icon-tabler-x'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									strokeWidth='2.5'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' />
									<line x1='18' y1='6' x2='6' y2='18' />
									<line x1='6' y1='6' x2='18' y2='18' />
								</svg>
							</button>
						</div>
					</div>
				</div>
				<div className='w-full flex justify-center py-12' id='button'>
					{/* <button
						className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm'
						onClick={modalHandler}
					>
						Open Modal
					</button> */}
				</div>
			</dh-component>
		</div>
	);
}

export default AddBugPopModal