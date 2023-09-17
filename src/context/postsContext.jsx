import React from 'react';
import PropTypes from 'prop-types';
import {useBestPost} from '../hooks/useBestPost';

export const postsContext = React.createContext({});

export const PostsContextProvider = ({children}) => {
  const [bestPosts] = useBestPost();

  return (
    <postsContext.Provider value={{bestPosts}}>
      {children}
    </postsContext.Provider>
  );
};

PostsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
