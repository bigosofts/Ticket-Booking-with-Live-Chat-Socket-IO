exports.selectData = async(query, projection) => {

    

    const payloaddata ={
        query:query,
        projection:projection
    };
    const res = await fetch('/apis/v1/select-orders', {
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

   


    const res = await fetch(`/apis/v1/delete-order/${id}`, {
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
    orderID,
    packageID,
    instructorID,
    orderDescription,
    orderStatus,
    orderPrice,
    orderNumber,
    activeStatus,
    clientID) => {

    const aboutdata={
        orderID,
        packageID,
        instructorID,
        orderDescription,
        orderStatus,
        orderPrice,
        orderNumber,
        activeStatus,
        clientID
 }


  const res = await fetch(`/apis/v1/create-order`, {
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
    orderID,
    packageID,
    instructorID,
    orderDescription,
    orderStatus,
    orderPrice,
    orderNumber,
    activeStatus,
    clientID
) => {

  

  const aboutdata={
    _id: idValue,
    orderID,
    packageID,
    instructorID,
    orderDescription,
    orderStatus,
    orderPrice,
    orderNumber,
    activeStatus,
    clientID
 }

  const res = await fetch(`/apis/v1/update-order`, {
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