document.addEventListener("DOMContentLoaded", function () {
    fetch("https://www.googleapis.com/books/v1/volumes?q=bestseller") 
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("services-container");
            container.innerHTML = ""; 
            
            if (!data.items) {
                container.innerHTML = "<p>No books found.</p>";
                return;
            }

            data.items.slice(0,6).forEach(book => {
                const volumeInfo = book.volumeInfo;
                const title = volumeInfo.title || "No title available";
                const author = volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown author";
                const description = volumeInfo.description.length >30 ? volumeInfo.description.substring(0, 30) + "..." : volumeInfo.description || "No description available";
                const image = volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150";

                const serviceHTML = `
                    <div class="col-lg-2 col-md-3 col-sm-4 col-4">
                         <div class="single-service-item" style="height: 390px;">
                            <div class="single-service-icon">
                                <img src="${image}" alt="${title}" style="width: 100%; height: 200px; border-radius: 5px;">
                            </div>
                        
                            <h4><a href="#" style="height:35px;">${title}</a></h4>
                            <h6 style="height:26px;">${author}</h6>
                            <p style="height:47px;">${description}</p>
                            <button class="btn btn-primary py-3">Read More</button>
                        </div>
                    </div>
                `;
                container.innerHTML += serviceHTML;
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});


