import React, { useEffect, useState } from 'react'
import Copy from '../assets/copy.svg'
import { useSearchParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const pasteId = searchParams.get("pasteId")
    const dispatch = useDispatch()
    const allPastes = useSelector((state) => state.paste.pastes)

    function handleClick() {
        const pasteDetails = {
            _id: pasteId || Date.now().toString(30),
            title: title,
            content: content,
            date: new Date()
        }

        if(pasteId) {
            dispatch(updateToPaste(pasteDetails))
        }

        else{
            dispatch(addToPaste(pasteDetails))
        }

        setTitle('')
        setContent('')
        setSearchParams({})
    }

    useEffect(() => {
        if(pasteId) {
            const editPaste = allPastes.find((value) => value._id === pasteId)
            setTitle(editPaste.title)
            setContent(editPaste.content)
        }
    }, [pasteId])

    function handleCopy(cont) {
        navigator.clipboard.writeText(content)
        toast.success("Copied Successfully")
    }

  return (
    <div>
        <div className='width-margin w-full'>
            <div className='flex items-center justify-between mt-12 h-[40px]'>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='w-[81%] h-full border px-4 py-2 rounded-md focus:outline-blue-500' />
                <button onClick={handleClick} className=''>{!pasteId? 'Create My Paste': 'Update My Paste'}</button>
            </div>

            <div className='border mt-9 h-[60vh] rounded-md'>
                <div className='flex items-center justify-between px-5'>
                    <div className='flex gap-x-1 items-center h-8'>
                        <div className='rounded-full bg-red-500 w-[9px] aspect-square'></div>
                        <div className='rounded-full bg-yellow-300 w-[9px] aspect-square'></div>
                        <div className='rounded-full bg-green-500 w-[9px] aspect-square'></div>
                    </div>
                    <div>
                        <img onClick={(e) => handleCopy(content)} src={Copy} alt="copy" className='cursor-pointer' />
                    </div>
                </div>
                <div className='h-full'>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} className='border-t w-full h-[calc(100%-32px)] px-5 py-3 focus:outline-blue-500' placeholder='Write Your Content Here' name="content" id="content"></textarea>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home