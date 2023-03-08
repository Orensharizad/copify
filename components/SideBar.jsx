import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, RssIcon, } from "@heroicons/react/24/solid"
import Link from "next/link"

function SideBar() {
    return (
        <div className="bg-black text-white p-5 text-xs border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide lg:text-sm sm:max-w-[12rem] lg:min-w-[15rem] hidden md:inline-flex ">
            <div className="space-y-4 text-md font-bold">
                <div className="flex items-center justify-center gap-3">
                    <img className="w-10 h-10" src="https://playlist-kqq9.onrender.com/static/media/logo-pic-white.0b8c5ac6eec4a813c1c2.png" alt="" />
                    <h3 className="text-3xl bold">Copyfy</h3>
                </div>
                <Link href="/" className="sidebar-item">
                    <HomeIcon className="h-6 w-6" />
                    <p>Home</p>
                </Link>
                <Link href="/search" className="sidebar-item">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                    <p>Search</p>
                </Link>
                <button className="sidebar-item">
                    <BuildingLibraryIcon className="h-6 w-6" />
                    <p>Your Libary</p>
                </button>

                <button className="sidebar-item">
                    <PlusCircleIcon className="h-6 w-6" />
                    <p>Create Playlist</p>
                </button>
                <button className="sidebar-item">
                    <HeartIcon className="h-6 w-6" />
                    <p>Liked Songs</p>
                </button>
                <button className="sidebar-item">
                    <RssIcon className="h-6 w-6" />
                    <p>Your episodes</p>
                </button>







            </div>
        </div>
    )
}

export default SideBar