// eslint-disable-next-line import/prefer-default-export
export function filterExploration(sortie, value) {
  const Explorationfilter = sortie.filter(
    (result) => result.departement === value
  );

  return Explorationfilter;
}

