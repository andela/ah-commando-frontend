export const activateLike = (setState, state, data) => {
  const { likes } = data;
  const {
    hasLiked, likeAction, lc,
  } = state;
  if (likeAction && !hasLiked && likes > 0) {
    setState({
      lc: lc + 1,
      hasLiked: true,
    });
  }
  if (!likeAction && hasLiked) {
    setState(prevState => ({
      ...prevState,
      lc: (prevState.lc < 1 ? 0 : lc - 1),
      hasLiked: false,
    }));
  }
  if (likeAction && hasLiked) {
    setState(prevState => ({
      ...prevState,
      dlc: prevState.dlc - 1,
      lc: prevState.lc + 1,
      hasLiked: true,
    }));
  }
};

export const activateDislikes = (setState, state, data) => {
  const { dislikes } = data;
  const {
    hasLiked, likeAction, dlc,
  } = state;
  if (likeAction && !hasLiked && dislikes > 0) {
    setState({
      dlc: dlc + 1,
      hasLiked: true,
    });
  }
  if (!likeAction && hasLiked) {
    setState(prevState => ({
      ...prevState,
      dlc: (prevState.dlc < 1 ? 0 : dlc - 1),
      hasLiked: false,
    }));
  }
  if (likeAction && hasLiked) {
    setState(prevState => ({
      ...prevState,
      dlc: prevState.dlc + 1,
      lc: prevState.lc - 1,
      hasLiked: true,
    }));
  }
};
