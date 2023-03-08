'use client'
import { stationService } from '../../services/station.service'
import { useRouter } from "next/navigation"


function SearchIndex() {

    const router = useRouter()
    const ganres = stationService.getGenre()

    const onNavigate = (id) => {
        router.push(`/search/${id}`)
    }

    return (
        <section className='pt-16 px-8'>
            <h3 className='text-white text-3xl font-bold py-4'>Browse all</h3>
            <div className='ganres-section'>

                {ganres?.map(ganre =>
                    <img onClick={() => onNavigate(ganre.id)} className='rounded-lg cursor-pointer hover:opacity-90' key={ganre.id} src={ganre.imgUrl} alt="" />

                )}
            </div>

        </section>
    )
}

export default SearchIndex