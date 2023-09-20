import {Puff} from 'react-loader-spinner';

export const PuffPreloader = () => (
  <Puff
    height="80"
    width="80"
    radius={10}
    color="#cc6633"
    ariaLabel="puff-loading"
    wrapperStyle={{display: 'flex', justifyContent: 'center', height: '100%'}}
    wrapperClass=""
    visible={true}
  />
);
