import React, { useState, useEffect, useRef } from 'react';

//!This Component uses Tailwind CSS

//! This Component can take "array" and "label" as props
//!      where "array" is the array of options to be displayed in the dropdown
//!		 and "label" is the label of the dropdown button.
//TODO: Bug: when hovering to get tool tip then selecting, changes dropdown button to tooltip.
function Dropdown({ array, label, setBugPriority }) {
	const [isVisible, setIsVisible] = useState(false);
	const [noSelection, setNoSelection] = useState('Dropdown');
	const [dropdownLabel, setDropdownLabel] = useState('Dropdown');
	const [isHover, setIsHover] = useState(false);
	const [thisOption, setThisOption] = useState('');
	const [separatedArray, setSeparatedArray] = useState([]);
	const [unseparatedArray, setUnseparatedArray] = useState([]);
	const [optionsArray, setOptionsArray] = useState([
		{
			option: 'option1',
			value: 'value1',
			display: 'Option 1',
			separated: false,
			tooltip: 'This is a tooltip',
		},
		{
			option: 'option2',
			value: 'value2',
			display: 'Option 2',
			separated: false,
		},
		{
			option: 'option3',
			value: 'value3',
			display: 'Option 3',
			separated: false,
			tooltip: 'This is another tooltip',
		},
		{
			option: 'option4',
			value: 'value4',
			display: 'Option 4',
			separated: true,
		},
		{
			option: 'noSelection',
			value: 'value5',
			display: 'No Selection',
			separated: true,
		},
	]);

	//Optional Settings:
	const header = false;
	
	useEffect(() => {
		setSeparatedArray([]);
		setUnseparatedArray([]);
		
		if (label) {
			setDropdownLabel(label);
			setNoSelection(label);
		}

		if (array) {
			setOptionsArray(array);
		}

		optionsArray.forEach((item) => {
			if (item.separated) {
				setSeparatedArray((prevState) => [...prevState, item]);
			} else {
				setUnseparatedArray((prevState) => [...prevState, item]);
			}
		});
	}, [optionsArray]);

	function visible() {
		if (isVisible) {
			return 'dropdown-menu min-w-max absolute w-full text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none bg-gray-800';
		} else {
			return 'dropdown-menu min-w-max absolute w-full text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none bg-gray-800 hidden';
		}
	}

	function changeVisible() {
		setIsVisible(!isVisible);
	}

	function handleChange(e) {
		const selectedOptionFromArray = optionsArray[parseInt(e.target.attributes.value.value)];
		if (selectedOptionFromArray.option === noSelection) {
			setDropdownLabel(noSelection);
			changeVisible();
		} else {
			setDropdownLabel(selectedOptionFromArray.display);
			changeVisible();
			setBugPriority(parseInt(e.target.attributes.value.value));
		}
	}



	function handleMouseEnter(e) {
		setTimeout(() => {
			setIsHover(true);
			setThisOption(e.target.id);
		}, 750);
	}

	function handleMouseLeave() {
		setIsHover(false);
	}

	const optionsMap = unseparatedArray.map((item, index) => {
		return (
			<li key={index + ' li'} id={item.option}>
				<div
					className='dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600'
					value={item.value}
					id={item.tooltip}
					key={index + 'div'}
					onClick={handleChange}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{item.display}
					{item.tooltip && isHover && thisOption === item.tooltip ? (
						<span className='text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600 '
						value={item.value}>
							{item.tooltip}
						</span>
					) : null}
				</div>
			</li>
		);
	});

	const separatedOptionsMap = separatedArray.map((item, index) => {
		return (
			<li key={index + ' li'} id={item.option}>
				<div
					className='dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600'
					value={item.value}
					id={item.tooltip}
					key={index + 'div'}
					onClick={handleChange}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{item.display}
					{item.tooltip && isHover && thisOption === item.tooltip ? (
						<span
							className='text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600 '
							value={item.value}
						>
							{item.tooltip}
						</span>
					) : null}
				</div>
			</li>
		);
	});

	return (
		<div className='flex justify-center'>
			<div>
				<div className='dropdown relative'>
					<div
						className='dropdown-toggle px-6 py-2.5 bg-indigo-700 text-white font-bold text-sm leading-tight uppercase rounded shadow-md hover:bg-indigo-600 hover:shadow-lg focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap'
						id='dropdownMenuButton2'
						data-bs-toggle='dropdown'
						aria-expanded='false'
						onClick={changeVisible}
					>
						{dropdownLabel}
						<svg
							aria-hidden='true'
							focusable='false'
							data-prefix='fas'
							data-icon='caret-down'
							className='w-2 ml-2'
							role='img'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 320 512'
						>
							<path
								fill='currentColor'
								d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'
							></path>
						</svg>
					</div>
					<ul className={visible()}>
						{header ? (
							<h6 className='text-gray-400 font-bold text-sm  py-2 px-6 w-full whitespace-nowrap bg-transparent flex items-center'>
								Dropdown Header
							</h6>
						) : null}
						{optionsMap}
						{separatedArray.length > 0 ? (
							<>
								<li>
									<hr className='h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25' />
								</li>
								<>
									{/* <div
										className='dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700'
										href='#'
									> */}
									{separatedOptionsMap}
									{/* </div> */}
								</>
							</>
						) : null}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
