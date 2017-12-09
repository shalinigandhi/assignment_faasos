var data = [];
var element = document.querySelector('.image_list');

var lists = [];
var currentImageIndex ;


function fetchAndSetImages() {

    var url = "https://api.faasos.io/v1/product/get_all_product_by_store/12.json";
    var options = {
        headers: {
            "Client-Source": 4,
            "Content-Type": "application/json"
        }
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonResponse) {
            data = jsonResponse;
            addProductImage(data);
        })
        .catch(function(err) {
            // Error :(
            alert('error fetching from api');
        });
}


function createImageElement(imagePath) {
    var image_wrapper = document.createElement('li');
    var img = document.createElement('img');

    image_wrapper.appendChild(img);

    image_wrapper.className = 'image_wrapper';
    img.src = imagePath;

    return image_wrapper;
}

function addProductImage(data) {
    for (i = 0; i < data.promotional_products.products.length; i++) {
        var productImage = data.promotional_products.products[i].product_image;
        var container = createImageElement(productImage);
        element.appendChild(container);
    }
    
    lists = document.querySelectorAll('.image_wrapper');
    
    currentImageIndex = 0;
    showOneImage(0);
}

function showOneImage(indexToShow) {

    // Hide all images
    for (i = 0; i < lists.length; i++) {
        lists[i].classList.remove('active');
    }

    // Show current image
    lists[indexToShow].classList.add('active');

}

function changeImage(direction) {
    if (direction == 'next') {
        currentImageIndex++;
        if (currentImageIndex == lists.length) {
            currentImageIndex = 0;
        }
    } else if (direction == 'previous') {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = lists.length;
        }
    }

    showOneImage(currentImageIndex);
}

fetchAndSetImages();