window.onload = function () {
  let user = {};

  let userId = user.id;
  let orderList = document.getElementById('order-list');

  fetch('http://localhost:8000/api/users', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },

    method: 'GET',
  })
    .then((response) => {
      // Handle the response

      return response.json();
    })
    .then((data) => {
      user = data;
      console.log(user);

      fetch(`http://localhost:8000/api/orders/getByuserId/${data.data.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data1) => {
          console.log(data1);

          for (let i = 0; i < data1.length; i++) {
            fetch(
              `http://localhost:8000/api/products/id/${data1[i].orderedProducts[0].productId}`,
              {
                method: 'GET',
              },
            )
              .then((res) => {
                return res.json();
              })
              .then((data2) => {
                console.log(data2);

                orderList.innerHTML += `<li>
            <div class="product-left">
              <div class="product-img">
                <a href="http://localhost:8000/detail/?id=${data2._id}">
                  <img src="/media/${data2.imgUrl}" alt="" />
                </a>
              </div>
              <div class="product-name">
                <a href="http://localhost:8000/detail/?id=${data2._id}"> ${data2.name} </a>
              </div>
            </div>
            <div class="product-right">
              <div class="purhcase-date">${data1[i].createdAt}</div>
              <div class="product-id">${data1[i]._id}</div>
              <div class="quantity">${data1[i].orderedProducts[0].quantity}</div>
              <div class="product-price">${data1[i].price}</div>
            </div>
          </li>`;
              });
          }
        });
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
};

console.log(localStorage.getItem('token'));
