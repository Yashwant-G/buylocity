
console.log("hi");
var page = 0;
document.querySelector("#redirect").load(function () {
  page++;
  console.log(page);
  if (page > 1) {
    // Replace with Number of Pages in Survey
    console.log("redirecting to");
    document.location = "https://cfninjahacks.com"; // Replace with the Page you want to send them to
  }
});
