import StationPreview from './StationPreview';

function StationList({ stations }) {
    return (
        <section className=' grid-card gap-4'>
            {stations.map(station =>
                <StationPreview key={station._id} station={station} />
            )}
        </section>
    )
}

export default StationList