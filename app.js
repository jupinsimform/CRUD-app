// var product_id = document.getElementById("product_id").value;
// var product_name = document.getElementById("product_name").value;
// var image = document.getElementById("image").value;
// var price = document.getElementById("price").value;
// var details = document.getElementById("details").value;

function validateForm() {
  var product_id = document.getElementById("product_id").value;
  var product_name = document.getElementById("product_name").value;
  var image = document.getElementById("image").value;
  var price = document.getElementById("price").value;
  var details = document.getElementById("details").value;
  if (product_id == "") {
    alert("product ID is Required");
    return false;
  }

  if (product_name == "") {
    alert("Product Name is Required");
    return false;
  }
  if (price == "") {
    alert("Price must be Required");
    return false;
  }
  return true;
}

function showData() {
  let productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  var html = "";

  productList.forEach((element, index) => {
    html += "<tr>";
    html += "<td>" + element.product_id + "</td>";
    html += "<td>" + element.product_name + "</td>";
    html += "<td>" + element.image + "</td>";
    html += "<td>" + element.price + "</td>";
    html += "<td>" + element.details + "</td>";
    html +=
      "<td> <button onclick='deleteData(" +
      index +
      ")' class='btn btn-danger'>Delete</button> <button onclick='updateData(" +
      index +
      ")' class='btn btn-warning'>Edit</button></td>";
    html += "</tr>";
  });
  document.querySelector("#crudtable tbody").innerHTML = html;
}

document.onload = showData();

function addProduct() {
  var product_id = document.getElementById("product_id").value;
  var product_name = document.getElementById("product_name").value;
  var image = document.getElementById("image").value;
  var imageData = image.slice(12);

  //   console.log(imageData);
  var price = document.getElementById("price").value;
  var details = document.getElementById("details").value;
  if (validateForm() == true) {
    let productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }
    // console.log(typeof image);
    productList.push({
      product_id: product_id,
      product_name: product_name,
      image: imageData,
      price: price,
      details: details,
    });

    localStorage.setItem("productList", JSON.stringify(productList));
    showData();
    document.getElementById("product_id").value = "";
    document.getElementById("product_name").value = "";
    document.getElementById("image").value = "";
    document.getElementById("price").value = "";
    document.getElementById("details").value = "";
  }
}

function deleteData(index) {
  let productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }
  productList.splice(index, 1);

  localStorage.setItem("productList", JSON.stringify(productList));
  showData();
}

function updateData(index) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  let productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }
  console.log("update");
  console.log(productList[index].image);
  document.getElementById("product_id").value = productList[index].product_id;
  document.getElementById("product_name").value =
    productList[index].product_name;
  //   document.getElementById("image").value = productList[index].image;
  document.getElementById("price").value = productList[index].price;
  document.getElementById("details").value = productList[index].details;

  document.querySelector("#update").onclick = function (index) {
    // let productList;
    // if (localStorage.getItem("productList") == null) {
    //   productList = [];
    // } else {
    //   productList = JSON.parse(localStorage.getItem("productList"));
    // }
    console.log("inner update");
    if (validateForm() == true) {
      productList[index].product_id =
        document.getElementById("product_id").value;
      productList[index].product_name =
        document.getElementById("product_name").value;
      productList[index].image = document.getElementById("image").value;
      productList[index].price = document.getElementById("price").value;
      productList[index].details = document.getElementById("details").value;

      localStorage.setItem("productList", JSON.stringify(productList));
      showData();
      document.getElementById("product_id").value = "";
      document.getElementById("product_name").value = "";
      document.getElementById("image").value = "";
      document.getElementById("price").value = "";
      document.getElementById("details").value = "";

      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}
