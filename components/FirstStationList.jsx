'use client'

import FirstStationPreview from "./FirstStationPreview";

function FirstStationList({ stations }) {
    return (
        <div className='first-grid-card     '>
            {stations.map(station =>
                <FirstStationPreview key={station._id} station={station} />

            )}
        </div>
    )
}

export default FirstStationList