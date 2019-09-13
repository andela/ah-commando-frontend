export const activateLike = (setState, state, data) => {
  const { likes, dislikes } = data;
  const { hasLiked, likeAction } = state;
  if (likeAction && !hasLiked && likes > 0) {
    setState(prevState => ({
      ...prevState,
      lc: prevState.lc + 1,
      hasLiked: true,
    }));
  }
  if (!likeAction && likes < 1 && hasLiked) {
    setState(prevState => ({
      ...prevState,
      lc: prevState.lc - 1,
      hasLiked: false,
    }));
  }
  if (likeAction && (likes > dislikes) && hasLiked) {
    setState(prevState => ({
      ...prevState,
      dlc: prevState.dlc - 1,
      lc: prevState.lc + 1,
      hasLiked: true,
    }));
  }
};

export const activateDislikes = (setState, state, data) => {
  const { likes, dislikes } = data;
  const { hasLiked, likeAction } = state;
  if (likeAction && !hasLiked && dislikes > 0) {
    setState(prevState => ({
      ...prevState,
      dlc: prevState.dlc + 1,
      hasLiked: true,
    }));
  }
  if (!likeAction && dislikes < 1 && hasLiked) {
    setState(prevState => ({
      ...prevState,
      dlc: prevState.dlc - 1,
      hasLiked: false,
    }));
  }
  if (likeAction && (dislikes > likes) && hasLiked) {
    setState(prevState => ({
      ...prevState,
      dlc: prevState.dlc + 1,
      lc: prevState.lc - 1,
      hasLiked: true,
    }));
  }
};
