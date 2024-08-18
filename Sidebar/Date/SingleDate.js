function SingleDate({ group, text, click }) {
  function niceDate(date) {
    var isoTime = date;
    var date = new Date(isoTime);

    var options = {
      // day: "numeric",
      month: "long",
    };

    var formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  return (
    <label className="sidebar-label-container">
      <input
        onChange={(e) => click(e.target.value)}
        type="radio"
        name={group}
        value={text}
      ></input>
      <span className="checkmark"></span>
      {text}
    </label>
  );
}

export default SingleDate;
