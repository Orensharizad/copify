

function StationPreview({ station }) {
    return (
        <section className="text-white p-8  ">
            <div className="p-4 bg-[#3a3a3aa9] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#4e4e4ea9]">
                <img className="w-56 h-56 shadow-2xl" src={station.imgUrl} />
                <h2>{station.name}</h2>
            </div>

        </section>
    )
}

export default StationPreview