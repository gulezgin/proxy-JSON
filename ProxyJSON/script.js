document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/proxy?url=https://www.next.co.uk/style/st367391/d37700')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid JSON data');
            }

            if (!data.name || !data.image || !data.description || !data.brand || !data.offers || !data.review) {
                throw new Error('Missing required properties in JSON data');
            }

            var productInfoContainer = document.getElementById('productInfo');
            if (productInfoContainer) {
                var productInfoHTML = `
                    <p><strong>Product Name:</strong> ${data.name}</p>
                    <img class="product-image" src="${data.image}" alt="${data.name}">
                    <p><strong>Description:</strong> ${data.description}</p>
                    <p><strong>Brand:</strong> ${data.brand.name}</p>
                    <div class="product-info">
                        <h2>Offers</h2>
                        <ul class="offer-list">
                `;
                data.offers.forEach(function(offer) {
                    productInfoHTML += `<li class="offer-item" data-price="${offer.price}" data-currency="${offer.priceCurrency}" data-availability="${offer.availability}" data-sku="${offer.sku}">Price: ${offer.price} ${offer.priceCurrency}, Condition: ${offer.availability}, SKU: ${offer.sku}</li>`;
                });
                productInfoHTML += '</ul>';

                if (data.review.length > 0) {
                    productInfoHTML += `
                        <h2>Reviews</h2>
                        <p><strong>Review Count:</strong> ${data.aggregateRating.reviewCount}</p>
                        <ul class="review-list">
                            <li class="review-item" data-author="${data.review[0].author.name}" data-date="${data.review[0].datePublished}" data-rating="${data.review[0].reviewRating.ratingValue}" data-description="${data.review[0].description}">
                                <span class="review-author">Author: ${data.review[0].author.name}</span><br>
                                <span class="review-date">Date: ${data.review[0].datePublished}</span><br>
                                <span class="review-rating">Rating: ${data.review[0].reviewRating.ratingValue} / ${data.review[0].reviewRating.bestRating}</span><br>
                                <span>Description: ${data.review[0].description}</span>
                            </li>
                        </ul>
                    `;
                }

                productInfoContainer.innerHTML = productInfoHTML;

                
                var productData = {};

                

                var jsonDataString = JSON.stringify(productData);
                console.log(jsonDataString);
            } else {
                console.error('Product info container not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});