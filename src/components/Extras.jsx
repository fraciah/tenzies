import PropTypes from 'prop-types';

export function Extras({ rolls, time }) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
   
    return (
        <div className="extras">
            <h3>Number of rolls: <span className="extras-item">{rolls}</span></h3>
            <h3>Time: <span className="extras-item">{`${minutes}m ${seconds}s`}</span></h3>
            <h3>Best time: <span className="extras-item">{rolls}</span></h3>
        </div>
    )
}
Extras.propTypes = {
    rolls: PropTypes.number.isRequired,
    setRolls: PropTypes.func.isRequired,
    time: PropTypes.number.isRequired
}