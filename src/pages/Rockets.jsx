import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getRocketsArr, reserveRocket, unreserveRocket,
} from '../redux/rockets/rocketsSlice';

function RocketsFunction() {
  const dispatch = useDispatch();
  const rocketsArr = useSelector((state) => state.rockets.rocketsArr);
  const ifSucceed = useSelector((store) => store.rockets.ifSucceed);

  const reserveHandel = (id, reserved) => {
    if (reserved) {
      dispatch(unreserveRocket(id));
    } else {
      dispatch(reserveRocket(id));
    }
  };

  useEffect(() => {
    if (rocketsArr.length === 0) {
      dispatch(getRocketsArr());
    }
  }, [dispatch, ifSucceed, rocketsArr.length]);

  return (
    <>
      {rocketsArr.map((rocket) => (
        <div key={rocket.id} className="rocket-ele">
          <img src={rocket.flickr_images[0]} alt={rocket.rocket_name} className="rocket-img" />
          <div className="rocket-info">
            <h3>{rocket.rocket_name}</h3>
            {rocket.reserved ? (
              <div className="rocket-description">
                <span className="reserved-badge">Reserved</span>
                <span className="rocket-description-text">{rocket.description}</span>
              </div>
            ) : (
              <span className="rocket-description-text">{rocket.description}</span>
            )}
            {' '}
            <button
              type="button"
              onClick={() => reserveHandel(rocket.id, rocket.reserved)}
              className={rocket.reserved ? 'reserved-rocket' : 'unreserve-rocket'}
            >
              {rocket.reserved ? 'Cancel Reservation' : 'Reserve Rocket'}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
export default RocketsFunction;
