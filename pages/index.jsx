
import SideBar from "../components/SideBar";
import StationIndex from "../components/StationIndex";


const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className='flex'>
        <SideBar />
        <StationIndex />
      </main>

    </div>
  )
}

export default Home
