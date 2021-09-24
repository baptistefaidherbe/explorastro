const explosFilter = (
  explos,
  departement,
  fieldZone,
  searchName,
  searchAuthor,
) => {
  const test = explos.filter((element) => {
    let result;
    if (departement !== 'Choisisez un département') {
      result = element.departement === departement;
    }
    else if (searchAuthor !== '' && fieldZone) {
      console.log('ici')
      result = element.username.includes(searchAuthor) && element.distance <= fieldZone;
    }
    else if (fieldZone && !searchName) {
      console.log('icii')
      result = element.distance <= fieldZone;
    }
    else if (searchName !== '' && !fieldZone) {
      result = element.name.includes(searchName);
    }
    else if (searchName !== '' && fieldZone) {
      result = element.name.includes(searchName) && element.distance <= fieldZone;
    }
    else if (searchAuthor !== '' && !fieldZone) {
      result = element.username.includes(searchAuthor);
    }
    else {
      result = element;
    }
    return result;
  });
  return test;
};

export default explosFilter;
