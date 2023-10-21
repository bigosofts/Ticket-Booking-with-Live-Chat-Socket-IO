exports.selectData = async(query, projection) => {

    

    const payloaddata ={
        query:query,
        projection:projection
    };
    const res = await fetch('/apis/v1/select-instructors', {
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
exports.selectAllData = async(query, projection) => {

    

    const payloaddata ={
        query:query,
        projection:projection
    };
    const res = await fetch('/apis/v1/select-all-instructors', {
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
exports.selectAllDataPublic = async(query) => {

    

    const payloaddata ={
        query:query
    };
    const res = await fetch('/apis/v1/select-all-instructors-public', {
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

   


    const res = await fetch(`/apis/v1/delete-instructor/${id}`, {
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
    userName,
    instructorEmail,
    instructorPhone,
    instructorBio,
    activeStatus,
    isAdmin,
    password,
    profileImage) => {

    const aboutdata={
        userName,
        instructorEmail,
        instructorPhone,
        instructorBio,
        activeStatus,
        isAdmin,
        password,
        profileImage
 }

  const res = await fetch(`/apis/v1/create-instructor`, {
      method: 'POST',
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


exports.updateData = async(
    idValue,
    userName,
    instructorEmail,
    instructorPhone,
    instructorBio,
    activeStatus,
    isAdmin,
    password,
    profileImage
) => {

  

  const aboutdata={
    _id: idValue,
    userName,
    instructorEmail,
    instructorPhone,
    instructorBio,
    activeStatus,
    isAdmin,
    password,
    profileImage
 }

  const res = await fetch(`/apis/v1/update-instructor`, {
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