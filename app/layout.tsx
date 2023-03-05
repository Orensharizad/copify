import SideBar from "../components/SideBar"
import StationIndex from "../components/StationIndex"
import '../styles/globals.css'


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="bg-black h-screen overflow-hidden flex">
          <div >
            <SideBar />
          </div>
          <div className='flex-1'>{children}</div>

        </div>

      </body>
    </html>
  )
}
