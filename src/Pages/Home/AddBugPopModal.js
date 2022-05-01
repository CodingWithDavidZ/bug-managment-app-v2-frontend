import React, {useRef, useState, useContext} from 'react'
import Dropdown from '../../Components/Dropdown';
import AppContext from '../../Context/AppContext';
import {useQuery, useQueryClient} from 'react-query'
import * as api from '../../Api/ApiCalls';
import { useNavigate } from 'react-router-dom';


function AddBugPopModal() {
	const [isVisible, setIsVisible] = useState(false)
	const [bugPriority, setBugPriority] = useState(3)
	const {bugsFetch} = useContext(AppContext)
	const navigate = useNavigate()

	const queryClient=useQueryClient()

	const addBug = useQuery('addBug', () => api.submitNewBug(submitInfo.issue_title, submitInfo.issue_description, bugPriority, submitInfo.image_url))
	

	const [submitInfo, setSubmitInfo] = useState({
		issue_title: '',
		issue_description: '',
		priority: '',
		image_url: '',
	})

    const modalRef = useRef(null);

	function visible() {
		if (isVisible) {
			return 'py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute inset-0 ';
		} else {
			return 'py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute inset-0 hidden';
		}
	}

	function changeVisible(e) {
		e.preventDefault();
		setIsVisible(!isVisible);
		
	}

    let passedArray = [
			// { option: 'noSelection', value: null, display: defaultLabel },
			{ option: 'option1', value: 0, display: 'Critical', tooltip: 'Security Risk or Breaks Functionality' },
			{ option: 'option2', value: 1, display: 'Urgent', tooltip: 'Obstructs Operations in a Serious Manner' },
			{ option: 'option3', value: 2, display: 'Medium', tooltip: 'Issue Hinders Normal Usage but Applications Still Works' },
			{ option: 'option4', value: 3, display: 'Low (Default)', tooltip: 'Minor loss of function or an annoying behavior.' },
			{ option: 'option4', value: 4, display: 'Very Low', tooltip: 'Cosmetic Issues, Spelling Errors, Minor Graphical Issues' },
		];

		function handleSubmit(e) {
			e.preventDefault();
			api.submitNewBug(
				submitInfo.issue_title,
				submitInfo.issue_description,
				bugPriority,
				submitInfo.image_url
			);
			console.log('addBug', addBug);
					changeVisible(e);
					setSubmitInfo({
						issue_title: '',
						issue_description: '',
						priority: '',
						image_url: '',
					})
				}

  return (
		<div>
			<div
				className='focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded'
				onClick={changeVisible}
			>
				<p className='text-sm font-medium leading-none text-white'>Add Bug</p>
			</div>
			<dh-component>
				<form
					className={visible()}
					id='form'
					ref={modalRef}
					onSubmit={handleSubmit}
				>
					<div
						role='alert'
						className='container mx-auto w-11/12 md:w-2/3 max-w-lg'
					>
						<div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
							<div className='w-full flex justify-start text-gray-600 mb-3'>
								<svg
									version='1.0'
									xmlns='http://www.w3.org/2000/svg'
									width='52.000000pt'
									height='52.000000pt'
									viewBox='0 0 52.000000 52.000000'
									preserveAspectRatio='xMidYMid meet'
								>
									{' '}
									<g
										transform='translate(0.000000,52.000000) scale(0.050000,-0.050000)'
										fill='#000000'
										stroke='none'
									>
										{' '}
										<path d='M394 947 c-7 -6 1 -38 17 -69 24 -47 25 -65 5 -98 -37 -57 -65 -39 -72 48 -7 78 -49 92 -60 19 -18 -124 19 -147 236 -147 217 0 254 23 236 147 -11 73 -53 59 -60 -19 -7 -87 -35 -105 -72 -48 -20 33 -19 51 5 98 28 55 24 82 -13 82 -10 0 -27 -27 -39 -60 -13 -37 -35 -60 -57 -60 -22 0 -44 23 -57 60 -20 58 -43 74 -69 47z' />{' '}
										<path d='M189 839 c-42 -68 61 -239 144 -239 50 0 27 -39 -40 -67 -95 -40 -153 -122 -153 -217 0 -102 47 -93 56 10 5 52 24 87 69 125 78 66 102 29 27 -41 -62 -58 -79 -270 -22 -270 23 0 30 25 30 109 0 110 27 163 46 91 34 -130 139 -16 149 161 l8 139 -82 0 c-103 0 -181 68 -181 159 0 61 -26 81 -51 40z' />{' '}
										<path d='M800 801 c0 -92 -77 -161 -179 -161 l-81 0 0 -115 c1 -176 119 -320 154 -187 19 74 46 22 46 -89 0 -84 7 -109 30 -109 57 0 40 212 -22 270 -75 70 -51 107 27 41 45 -38 64 -73 69 -125 9 -103 56 -112 56 -10 0 95 -58 177 -153 217 -68 28 -90 67 -38 67 94 0 197 226 116 255 -17 5 -25 -13 -25 -54z' />{' '}
										<path d='M500 303 c0 -9 -25 -28 -55 -42 l-55 -24 50 -27 c31 -17 50 -44 50 -73 0 -28 12 -47 30 -47 18 0 30 19 30 47 0 29 19 56 50 73 l50 27 -55 24 c-30 14 -55 33 -55 42 0 9 -9 17 -20 17 -11 0 -20 -8 -20 -17z' />{' '}
									</g>{' '}
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
								value={submitInfo.issue_title}
								className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
								placeholder='Enter Title That Summarizes Bug'
								onChange={(e) => {
									setSubmitInfo({
										...submitInfo,
										issue_title: e.target.value,
									});
								}}
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
								value={submitInfo.issue_description}
								rows='3'
								placeholder='Detailed Explanation of Bug'
								onChange={(e) => {
									setSubmitInfo({
										...submitInfo,
										issue_description: e.target.value,
									});
								}}
							/>
							<div className='flex items-center justify-start w-full py-1.5'>
								<Dropdown
									array={passedArray}
									label={'Priority'}
									setBugPriority={setBugPriority}
									value={bugPriority}
								/>
							</div>
							<label
								htmlFor='expiry'
								className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
							>
								Screen Capture of Bug if Applicable
							</label>
							<input
								id='name'
								type='text'
								className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
								placeholder='URL of Screen Capture'
								value={submitInfo.image_url}
								onChange={(e) => {
									setSubmitInfo({
										...submitInfo,
										image_url: e.target.value,
									});
								}}
							/>

							<div className='flex items-center justify-start w-full'>
								<button
									className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'
									type='submit'
								>
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
				</form>
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