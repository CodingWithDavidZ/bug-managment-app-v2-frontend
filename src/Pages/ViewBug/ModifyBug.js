import React, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import AppContext from '../../Context/AppContext';

function ModifyBug({ rawProgress, bugId }) {
    const {bug} = useContext(AppContext);
	const [progressBar, setProgressBar] = useState(rawProgress);
	const [updateInfo, setUpdateInfo] = useState({
		issue_title: '',
		issue_description: '',
		assigned_to: '',
		progress: progressBar,
		status: '',
		status_modified_date: '',
		priority: '',
		image_url: '',
		approved: false,
		approved_by: '',
		resolution_summary: '',
		modified_by: '',
		actual_resolution_date: '',
	});
    const [isComplete, setIsComplete] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    
    function visible() {
        if (isVisible) {
            return 'py-1';
        } else {
            return 'py-1 hidden';
        }
    }

    function changeVisible() {
			setIsVisible(!isVisible);
            console.log(isVisible);
		}

    const isBugCompleted = () => {

    }

	const handleDelete = (e) => {
        e.preventDefault();
				if (window.confirm(`Are you sure you want to delete Bug: ${bug.id}`) == true) {
                    fetch (`http://localhost:3000/bugs/${bug.id}`, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    })
                    navigate('/')
				} else {
					console.log('false')
				}
	};

	const handleUpdate = (e) => {
        e.preventDefault();
        
        
	};

	const handleProgressChange = (e) => {
		setProgressBar(e.target.valueAsNumber);
	};

	return (
		<div className='' id={bug}>
			<form className='' onSubmit={handleUpdate} id={bug}>
				<div className='container mx-auto w-11/12 md:w-2/3 max-w-lg ' id={bug}>
					<label className='py-1' id={bug}>Title: </label>
					<input className='py-1 h-5' placeholder='Update Title'  id={bug}/>
					<br />
					<label className='py-1' id={bug}>Description: </label>
					<input className='py-1 h-5' placeholder='Update Description'  id={bug}/>
					<br />
					<label className='py-1' id={bug}>Assign: </label>
					<input className='py-1 h-5' placeholder='Assign To User'  id={bug}/>
					<br />
					<label className='py-1' id={bug}>Progress: </label>
					<input
						className='py-1 h-5'
                        id={bug}
						type='range'
						min='0'
						max='10'
						value={progressBar}
						placeholder='Update Progress'
						onChange={handleProgressChange}
					/>
					<br />
					<label className='py-1' id={bug}>Status: </label>
					<input className='py-1 h-5' placeholder='Update Status'  id={bug}/>
					<br />
					<label className='py-1' id={bug}>Priority: </label>
					<input className='py-1 h-5' placeholder='Update Priority'  id={bug}/>
					<br />
					<label className='py-1' id={bug}>Image URL: </label>
					<input type='url' placeholder='Add Image URL'  id={bug}/>
					<br />
					<div className='hidden' id={bug}>
						<label className='py-1' id={bug}>Approved? </label>
						<input className='py-1' type='checkbox'  id={bug}/>
					</div>
					<div className={visible()} id={bug}>
						<label className='' id={bug}>Resolution Summary</label>
						<textarea
							className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            id={bug}
							value=''
							rows='3'
							placeholder='Detailed Explanation of Bug'
                            onChange={(e) => setUpdateInfo({ ...updateInfo, resolution_summary: e.target.value })}
						/>
					</div>
					<div className='grid grid-cols-3' id={bug}>
						<div className='focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-center px-6 py-3 bg-indigo-700 hover:bg-green-600 focus:outline-none rounded' id={bug}>
							<button className='text-sm font-medium leading-none text-white' id={bug}>
								Submit
							</button>
						</div>
						<div className='col-start-3 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-center px-6 py-3 bg-indigo-700 hover:bg-red-600 focus:outline-none rounded' 
                        id={bug}
                        >
							<button
								className='text-sm font-medium leading-none text-white'
                                id={bug}
								type='button'
                                onClick={handleDelete}
							>
								Delete Bug
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ModifyBug;
