exports.selectData = async(query, projection) => {

    

    const payloaddata ={
        query:query,
        projection:projection
    };
    const res = await fetch('/apis/v1/select-clients', {
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
    const res = await fetch('/apis/v1/select-all-clients', {
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
    const res = await fetch('/apis/v1/select-all-clients-public', {
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
  console.log("clicked" + id);

    const res = await fetch(`/apis/v1/delete-client/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' 
        }
    })

    if(!res.ok) {
      console.log(res);
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
      
    }
   
    return res.json()
}


exports.createData = async(
        userName,
        clientEmail,
        clientPhone,
        activeStatus,
        password,
        profileImage) => {

    const aboutdata={
        userName,
        clientEmail,
        clientPhone,
        activeStatus,
        password,
        profileImage
 }

  const res = await fetch(`/apis/v1/create-client`, {
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
    clientEmail,
    clientPhone,
    activeStatus,
    password,
    profileImage
) => {

  

  const aboutdata={
    _id: idValue,
    userName,
    clientEmail,
    clientPhone,
    activeStatus,
    password,
    profileImage
 }

  const res = await fetch(`/apis/v1/update-client`, {
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