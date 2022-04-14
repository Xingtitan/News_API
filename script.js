$(document).ready(function () {
  // Show loading
  $("#loader-wrapper").show();

  // API key and Url
  const apiKey = "aa8818cae01ebc12908941025aed6a97";
  let urlNews =
    "https://gnews.io/api/v4/top-headlines?&token=" + apiKey + "&lang=en";

  // Fetch Data From Database
  fetch(urlNews)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Hide loading
      $("#loader-wrapper").hide();

      // Use loop to get information from object
      for (let i = 0; i < data.articles.length; i++) {
        var image = data.articles[i].image;
        var title = data.articles[i].title;
        var description = data.articles[i].description;
        var publishedAt = data.articles[i].publishedAt.slice(0, 10);
        var url = data.articles[i].url;

        // Put information in an array
        var outputNews = `<div class="card m-3 shadow">
        <div class="row g-0">
          <div class="col-12 col-lg-4">
            <img src="${image}" class="card-image rounded" alt="image + ${
          i + 1
        }">
          </div>
          <div class="col-12 col-lg-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
              <p class="card-text">${publishedAt}</p>
              <a href="${url}" class="btn btn-secondary" target="_blank">Read More</a>
            </div>
          </div>
          </div>
        </div>`;

        // Display news from web api
        $("#card-lists").append(outputNews);
      }
    });

  $("#searchBtn").click(function () {
    // Assign the search keyword to a variable
    let keyword = $("#searchInput").val();
    
    if (keyword !== "") {

      // New url
      newUrlNews ="https://gnews.io/api/v4/search?q=" + keyword + "&token=" + apiKey + "&lang=en";

      // Fetch Data From Database
      fetch(newUrlNews)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Clear card lists
          $("#card-lists").empty();

          // Use loop to get information from object
          for (let i = 0; i < data.articles.length; i++) {
            var image = data.articles[i].image;
            var title = data.articles[i].title;
            var description = data.articles[i].description;
            var publishedAt = data.articles[i].publishedAt.slice(0, 10);
            var url = data.articles[i].url;

            // Put information in an array
            var outputNews = `<div class="card m-3 shadow">
              <div class="row g-0">
                <div class="col-12 col-lg-4">
                  <img src="${image}" class="card-image rounded" alt="image + ${
              i + 1
            }">
                </div>
                <div class="col-12 col-lg-8">
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text">${publishedAt}</p>
                    <a href="${url}" class="btn btn-secondary" target="_blank">Read More</a>
                  </div>
                </div>
              </div>
            </div>`;

            // Display news from web api
            $("#card-lists").append(outputNews);
          }
        });
    } else {
      // The input information is not correct
      alert("Please enter a keyword!!!!!");
    }

    // Reset input information
    keyword = $("#searchInput").val("");
  });

  // If the enter key is pressed, the search is executed automatically
  $("#searchInput").on("keypress", function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      $("#searchBtn").click();
    }
  });
});
