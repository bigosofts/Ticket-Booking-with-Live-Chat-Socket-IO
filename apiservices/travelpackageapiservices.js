exports.selectData = async(query, projection) => {

    

    const payloaddata ={
        query:query,
        projection:projection
    };
    const res = await fetch('/apis/v1/select-packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloaddata),
    })

    if(!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}
exports.selectDataPublic = async(query, projection) => {

    

    const payloaddata ={
        query:query,
        projection:projection
    };
    const res = await fetch('/apis/v1/select-packages-public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloaddata),
    })

    if(!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}


exports.deleteData = async(id) => {

   


    const res = await fetch(`/apis/v1/delete-package/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' 
        }
    })

    if(!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}


exports.createData = async(
  packageId,
  packageType,
  packageTitle,
  createdUser,
  createdUserType,
  activeStatus,
  preset,
  presetUsers,
  country,
  activity,
  difficulty,
  price,
  duration,
  place,
  travelTime,
  previousExperience,
  equipment,
  groupSize,
  travelDescription,
  haveGuiding,
  haveAccomodation,
  haveFood,
  travelImage,
  reviews) => {

    const aboutdata={
      packageId,
      packageType,
      packageTitle,
      createdUser,
      createdUserType,
      activeStatus,
      preset,
      presetUsers,
      country,
      activity,
      difficulty,
      price,
      duration,
      place,
      travelTime,
      previousExperience,
      equipment,
      groupSize,
      travelDescription,
      haveGuiding,
      haveAccomodation,
      haveFood,
      travelImage,
      reviews
 }
 

  const res = await fetch(`/apis/v1/create-package`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aboutdata)
  })

  if(!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
    console.log(res);
  }
 
  return res.json()
}


exports.updateData = async(
  idValue,
  packageId,
  packageType,
  packageTitle,
  createdUser,
  createdUserType,
  activeStatus,
  preset,
  presetUsers,
  country,
  activity,
  difficulty,
  price,
  duration,
  place,
  travelTime,
  previousExperience,
  equipment,
  groupSize,
  travelDescription,
  haveGuiding,
  haveAccomodation,
  haveFood,
  travelImage,
  reviews
) => {

  

  const aboutdata={
    _id: idValue,
    packageId,
    packageType,
    packageTitle,
    createdUser,
    createdUserType,
    activeStatus,
    preset,
    presetUsers,
    country,
    activity,
    difficulty,
    price,
    duration,
    place,
    travelTime,
    previousExperience,
    equipment,
    groupSize,
    travelDescription,
    haveGuiding,
    haveAccomodation,
    haveFood,
    travelImage,
    reviews
 }

  const res = await fetch(`/apis/v1/update-package`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aboutdata)
  })

  if(!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}