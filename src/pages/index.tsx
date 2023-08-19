import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import callOpenAIModel from './api/api';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [userInput, setUserInput]= useState('');
  const [outputData, setOutputData] = useState<string[]>([]);

  const handleSubmit = async () => {
    const response = await callOpenAIModel(currentWeight, targetWeight, userInput);
    console.log(response);
    setOutputData(response.split('\n'));
  }

  return (
    <div className=' text-black bg-gradient-to-r from-blue-500 to-purple-500'>
      <nav className='flex justify-center mt-4'>
        <p className='font-bold text-3xl'>TrainWise AI 🤖💪🏻</p>
      </nav>
      <main className="flex min-h-screen items-center justify-between p-24">
        <div className='flex flex-col'>
          {/* Weight inputs */}
          <label className='font-bold'>Current wt. (in kg)</label>
          <input type='text' value={currentWeight} onChange={(e) => {setCurrentWeight(e.target.value)}} placeholder="Don't be shy..." className='p-1 rounded-md border border-gray-400 ' />
          
          <label className='mt-2 font-bold'>Target wt. (in kg)</label>
          <input type='text' value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} placeholder="Yes it's reachable" className='p-1 rounded-md border border-gray-400' />
          
          {/* <label className='mt-2' htmlFor='duration'>Select plan Duration</label>
          <select id='duration' value={duration} onChange={(e) => { setDuration(Number(e.target.value))}} name='duration' className='border border-gray-400 rounded-md'>
            <option value={2}>2 weeks</option>
            <option value={4}>4 weeks</option>
            <option value={8}>8 weeks</option>
            <option value={10}>10 weeks</option>
          </select> */}

          <label className='mt-2 font-bold'>Your inputs (optional)</label>
          <textarea value={userInput} onChange={ (e) => setUserInput(e.target.value)} placeholder="Nah.. we already got you covered" className='border border-gray-400 rounded-md p-1' />

          <div className='mt-2'>
            <button 
            className='bg-green-500 border rounded-md p-1 text-gray-100 hover:scale-110 transition-transform transform ' 
            onClick={() => {
              handleSubmit();
            }}>Generate Plan</button>
          </div>
        </div>
        <div className='p-4 overflow-y-auto border border-gray-300 rounded-md w-3/4 h-96'>
          {outputData.map((data, index) => <p>{data}</p>)}
        </div>
      </main>
    </div>
  )
}
