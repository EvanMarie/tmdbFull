const prioritizeImages = (a, b) => {
  if ((a.profile_path || a.poster_path) && !(b.profile_path || b.poster_path)) {
    return -1;
  } else if (!(a.profile_path || a.poster_path) && (b.profile_path || b.poster_path)) {
    return 1;
  } else {
    return 0;
  }
};
export {
  prioritizeImages as p
};
