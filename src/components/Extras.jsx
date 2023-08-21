import PropTypes from 'prop-types';

export function Extras({ rolls, setRolls }) {
   
    return (
        <div className="extras">
            <h3>Number of rolls: <span className="extras-item">{rolls}</span></h3>
            <h3>Time: <span className="extras-item">{rolls}</span></h3>
            <h3>Best time: <span className="extras-item">{rolls}</span></h3>
        </div>
    )
}
Extras.propTypes = {
    rolls: PropTypes.number.isRequired,
    setRolls: PropTypes.func.isRequired
}