import { authModalState } from "@/atoms/authModalAtom";
import { useCloseModal } from "@/components/Modals/AuthModal";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import { auth, firestore } from "@/firebase/firebase";
import useHasMounted from "@/hooks/useHasMounted";
import { doc, setDoc } from "firebase/firestore";

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

export default function Home() {
	const [loadingProblems, setLoadingProblems] = useState(true);
	const [addProblem, setAddProblem] = useState(false);
	const hasMounted = useHasMounted();
	const [user] = useAuthState(auth);

	const [state, setState] = useState({
		id: '',
		title: '',
		difficulty: '',
		category: '',
		order: '',
		videoId: '',
		link:''
	})
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name} = e.target;
		setState({
			...state,
			[name]: e.target.value
		})
	}
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
		e.preventDefault();
		const newProblem = {
			...state,
			order: Number(state.order)
		}
		await setDoc(doc(firestore, "problems", state.id), newProblem);
		setAddProblem(false)
	}
	 
	if (!hasMounted) return null;
   
	return (
		<>
			<main className='bg-dark-layer-2 min-h-screen'>
				<Topbar />
				<h1
					className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5'
				>
					&ldquo; UPSKILL TO BECOME A BETTER PROGRAMMER &rdquo; 👇
				</h1>

				<div className='relative overflow-x-auto mx-auto px-6 pb-10'>
					{loadingProblems && (
						<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
							{[...Array(10)].map((_, idx) => (
								<LoadingSkeleton key={idx} />
							))}
						</div>
					)}
					<table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
						{!loadingProblems && (
							<thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
								<tr>
									<th scope='col' className='px-1 py-3 w-0 font-medium'>
										Status
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Title
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Difficulty
									</th>

									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Category
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Solution
									</th>
								</tr>
							</thead>
						)}

						<ProblemsTable setLoadingProblems={setLoadingProblems} />
						
					</table>
					<div style={{ display: 'flex', justifyContent: 'center', padding: 16}}>
					 {user && 
					  <button className='bg-dark-fill-3 py-2 px-12 cursor-pointer rounded text-brand-orange' onClick={() => setAddProblem(true) } style={{ backgroundColor: 'white' }}>Add new problem</button> 
					 }
			    </div>
				</div>
			</main>
			{addProblem && <div id="addProblem">
			  <form onSubmit={handleSubmit}>
			    <div className="form-header"><div>Add Problem</div> <div onClick={() => setAddProblem(false)}>X</div>	</div>	
				<input className="problem-input" onChange={handleChange} type="text" placeholder="problem id" name="id"/>
				<input className="problem-input" onChange={handleChange} type="text" placeholder="title" name="title"/>
				<input className="problem-input" onChange={handleChange} type="text" placeholder="difficulty" name="difficulty"/>
				<input className="problem-input" onChange={handleChange} type="text" placeholder="category" name="category"/>
				<input className="problem-input" onChange={handleChange} type="text" placeholder="order" name="order"/>
				<input className="problem-input" onChange={handleChange} type="text" placeholder="videoId" name="videoId"/>
				<input className="problem-input" onChange={handleChange} type="text" placeholder="link" name="link"/>
				<button className="problem-btn" type="submit">Submit</button>
		     </form>
		  </div>
			}
			
		</>
	);
}


const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};
