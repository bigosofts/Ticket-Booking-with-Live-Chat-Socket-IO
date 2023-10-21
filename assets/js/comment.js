function myfunction(id) {
    if (id > 3) {
      document.getElementById("msg2").style.display = "block";
      document.getElementById("msg1").style.display = "none";
    } else {
      document.getElementById("msg2").style.display = "none";
      document.getElementById("msg1").style.display = "block";
    }
  }