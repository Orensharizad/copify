import StationPreview from './StationPreview';

function StationList({ stations }) {
    return (
        <section className='grid-card'>
            {stations.map(station =>
                <StationPreview key={station._id} station={station} />
            )}
        </section>
    )
}

export default StationList