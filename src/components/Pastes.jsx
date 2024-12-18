import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PencilLine, Trash2, Eye, Copy, Calendar } from 'lucide-react';
import { removePaste } from '../redux/pasteSlice';
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const Pastes = () => {
  const [search, setSearch] = useState('')
  const paste = useSelector((state) => state.paste.pastes)
  const dispatch = useDispatch()
  const filteredPaste = paste.filter((paste) => paste.title.toLowerCase().includes(search.toLowerCase()))

  function handleDelete(id) {
    dispatch(removePaste(id))
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content)
    toast.success("Copied Successfully")
  }

  return (
    <div>
      <div className='width-margin'>
        <div className='mt-12'>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='border w-full px-3 py-1 rounded-md focus:outline-blue-500' placeholder='Search Paste Here...' />
        </div>

        <div className='border mt-5 rounded-md'>
          <h1 className='text-3xl font-bold px-4 py-3'>All Pastes</h1>

          <div className='border-t px-4 py-5 space-y-4'>
            {filteredPaste.length > 0? (
              filteredPaste.map((paste) => {
                const newDate = new Date(paste.date)
                return(
                  <div key={paste._id} className='flex justify-between border px-3 py-4 rounded-md'>
                    <div className='flex flex-col gap-y-3'>
                      <h2 className='font-semibold text-2xl'>{paste.title}</h2>
                      <p className='text-sm text-slate-500'>{paste.content}</p>
                    </div>

                    <div className='flex flex-col gap-y-3 items-end w-[27%]'>
                      <div className='space-x-2'>
                        <button className='bg-transparent text-black border p-1 rounded'><Link to={`/?pasteId=${paste._id}`}><PencilLine size={16} /></Link></button>
                        <button onClick={(e) => handleDelete(paste?._id)} className='bg-transparent text-black border p-1 rounded'><Trash2 size={16} /></button>
                        <button onClick={(e) => handleView(paste)} className='bg-transparent text-black border p-1 rounded'><Link to={`/pastes/${paste._id}`}><Eye size={16} /></Link></button>
                        <button onClick={(e) => handleCopy(paste.content)} className='bg-transparent text-black border p-1 rounded'><Copy size={16} /></button>
                      </div>
                      <div className='flex items-center'>
                        <Calendar size={16} />
                        <p className='pl-1 text-sm'>{newDate.toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}</p>
                      </div>
                    </div>
                </div>
              )})
            ): ('No Pastes Available')} 
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Pastes