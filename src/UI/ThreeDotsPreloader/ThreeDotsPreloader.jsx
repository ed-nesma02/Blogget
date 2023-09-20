import {ThreeDots} from 'react-loader-spinner';

export const ThreeDotsPreloader = () => (
  <ThreeDots
    height="160"
    width="160"
    radius="20"
    color="#cc6633"
    ariaLabel="three-dots-loading"
    wrapperStyle={{display: 'flex', justifyContent: 'center'}}
    wrapperClassName=""
    visible={true}
  />
);
