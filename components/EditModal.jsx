import { useState } from 'react'
import { XMarkIcon } from "@heroicons/react/24/solid"
import { uploadService } from "../services/upload.service";

function EditModal({ station, setIsEdit, onUpdateStation }) {

    const [stationToEdit, setStationToEdit] = useState(station)


    const handleChange = ({ target }) => {
        const { value, name: filed } = target
        setStationToEdit(prev => ({ ...prev, [filed]: value }))
    }

    const handleChangeImg = async (ev) => {
        try {
            const { secure_url } = await uploadService.uploadImg(ev)
            console.log('secure_url: ', secure_url);
            setStationToEdit(prev => ({ ...prev, imgUrl: secure_url }))
        } catch (err) {
            console.log('err cannot upload img:', err)
        }
    }


    return (
        <section>
            <div onClick={() => setIsEdit(false)} className='black-screen'></div>
            <div className='modal flex flex-col gap-5 '>
                <div className='flex items-center justify-between text-white'>
                    <h3 className='text-xl'>Edit Details</h3>
                    <XMarkIcon onClick={() => setIsEdit(false)} className='h-6 w-6 cursor-pointer' />
                </div>
                <div className='flex items-center gap-2 text-white '>
                    <label htmlFor="upload" className='w-60 h-44 cursor-pointer'>
                        <img className='w-44 h-44' src={stationToEdit?.imgUrl} alt="" />
                        <input type="file" className='hidden' id='upload' onChange={handleChangeImg} />
                    </label>
                    <div className='flex flex-col gap-4 w-full'>
                        <input
                            type="text"
                            name='name'
                            value={stationToEdit?.name}
                            onChange={handleChange}
                            className='p-2 rounded border border-[#606060] bg-[#383838] outline-none'
                        />
                        <textarea
                            name="description"
                            className="pb-16 rounded border-none bg-[#454545] outline-none"
                            placeholder={"Add an optinal description"}
                            value={stationToEdit?.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button onClick={() => onUpdateStation(stationToEdit)} className='self-end py-3 px-6 border bg-white rounded-3xl hover:scale-105'>Save</button>


            </div >
        </section>
    )
}

export default EditModal