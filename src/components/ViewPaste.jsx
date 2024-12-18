import React from 'react'
import Copy from '../assets/copy.svg'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';

const ViewPaste = () => {
    const {id} = useParams()
    const allPastes = useSelector((state) => state.paste.pastes)
    const paste = allPastes.find((paste) => paste._id === id)
    console.log(paste)

    function handleCopy(content) {
      navigator.clipboard.writeText(content)
      toast.success("Copied Successfully")
    }

  return (
    <div>
        <div className='width-margin w-full'>
            <div className='flex items-center justify-between mt-12 h-[40px]'>
                <input value={paste._id} disabled type="text" placeholder='Title' className='w-[100%] h-full border px-4 py-2 rounded-md focus:outline-blue-500' />
            </div>

            <div className='border mt-9 h-[60vh] rounded-md'>
                <div className='flex items-center justify-between px-5'>
                    <div className='flex gap-x-1 items-center h-8'>
                        <div className='rounded-full bg-red-500 w-[9px] aspect-square'></div>
                        <div className='rounded-full bg-yellow-300 w-[9px] aspect-square'></div>
                        <div className='rounded-full bg-green-500 w-[9px] aspect-square'></div>
                    </div>
                    <div>
                        <img onClick={(e) => handleCopy(paste.content)} src={Copy} alt="copy" className='cursor-pointer' />
                    </div>
                </div>
                <div className='h-full'>
                    <textarea value={paste.content} disabled className='border-t w-full h-[calc(100%-32px)] px-5 py-3 focus:outline-blue-500' placeholder='Write Your Content Here' name="content" id="content"></textarea>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewPaste