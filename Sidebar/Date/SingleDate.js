function SingleDate({group, text, click}) {
  function niceDate(date){
    var isoTime = date;
    var date = new Date(isoTime);
  
    var options = {
      month: "long",
      day: "numeric",
    };
  
    var formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  return (
    <label className="sidebar-label-container">
      <input onChange={(e)=>click(e.target.value)} type="radio" name={group} value={text}></input>
      <span className="checkmark"></span>
      {niceDate(text)}
    </label>
  );
}

export default SingleDate;
