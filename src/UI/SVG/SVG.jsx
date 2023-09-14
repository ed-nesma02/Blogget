import React from 'react';
import PropTypes from 'prop-types';

export const SVG = (prop) => {
  const {
    path,
    id,
    className,
    width = 18,
    height = 18,
    x = 0,
    y = 0,
    fill = 'none',
  } = prop;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox={`${x} ${y} ${width} ${height}`}
      fill={fill}
      className={className}
    >
      <use href={`${path}#${id}`}></use>
    </svg>
  );
};

SVG.propTypes = {
  path: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  fill: PropTypes.string,
};
