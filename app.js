// var product_id = document.getElementById("product_id").value;
// var product_name = document.getElementById("product_name").value;
// var image = document.getElementById("image").value;
// var price = document.getElementById("price").value;
// var details = document.getElementById("details").value;

// const searchInput = document.getElementById("search");

function validateForm() {
  var product_id = document.getElementById("product_id").value;
  var product_name = document.getElementById("product_name").value;
  // var image = document.getElementById("image");
  var price = document.getElementById("price").value;
  var details = document.getElementById("details").value;
  var picture = document.getElementById("image1").src;
  //   console.log(product_id);
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
  if (picture == null) {
    alert("image is Required");
  }
  return true;
}

function showData() {
  var productList;
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
    html +=
      "<td>" +
      '<img src="' +
      element.image +
      '" alt="" class="img-fluid col-md-4"/>' +
      "</td>";
    // console.log(element.image);
    html += "<td>" + element.price + "</td>";
    html += "<td>" + element.details + "</td>";
    html +=
      "<td> <button onclick='deleteData(" +
      index +
      ")' class='btn btn-danger m-1'>Delete</button> <button onclick='updateData(" +
      index +
      ")' class='btn btn-warning m-1'>Edit</button></td>";
    html += "</tr>";
  });
  document.querySelector("#crudtable tbody").innerHTML = html;
}

document.onload = showData();

let file;

function readURL() {
  var image = document.getElementById("image").files[0];
  // console.log(URL.createObjectURL(image));
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.addEventListener("load", () => {
    // console.log(reader.result);
    file = reader.result;
  });

  document.getElementById("image1").src = URL.createObjectURL(image);

  // console.log(JSON.stringify(file));
  return;
}

function addProduct() {
  var product_id = document.getElementById("product_id").value;
  var product_name = document.getElementById("product_name").value;
  // var image = document.getElementById("image");
  // console.log(image.files);
  // var imageData = image.slice(12);

  //   console.log(imageData);
  // console.log(file);
  var price = document.getElementById("price").value;
  var details = document.getElementById("details").value;
  if (validateForm() == true) {
    let productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }

    productList.push({
      product_id: product_id,
      product_name: product_name,
      image: file,
      price: price,
      details: details,
    });
    // console.log(productList);
    localStorage.setItem("productList", JSON.stringify(productList));
    showData();
    document.getElementById("product_id").value = "";
    document.getElementById("product_name").value = "";
    document.getElementById("image").value = "";
    document.getElementById("image1").src = null;
    document.getElementById("price").value = "";
    document.getElementById("details").value = "";
  }
}

function deleteData(index) {
  var productList;
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
  //   console.log("update");
  //   console.log(productList[index].image);
  document.getElementById("product_id").value = productList[index].product_id;
  document.getElementById("product_name").value =
    productList[index].product_name;

  document.getElementById("image1").src = productList[index].image;

  document.getElementById("price").value = productList[index].price;
  document.getElementById("details").value = productList[index].details;

  document.querySelector("#update").onclick = function () {
    let productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
      //   console.log(productList);
    }
    // console.log("inner update");
    if (validateForm() == true) {
      // console.log(productList[index]);
      productList[index].product_id =
        document.getElementById("product_id").value;
      productList[index].product_name =
        document.getElementById("product_name").value;
      productList[index].image = document.getElementById("image1").src;
      productList[index].price = document.getElementById("price").value;
      productList[index].details = document.getElementById("details").value;

      localStorage.setItem("productList", JSON.stringify(productList));
      showData();
      document.getElementById("product_id").value = "";
      document.getElementById("product_name").value = "";
      document.getElementById("image").value = "";
      document.getElementById("image1").src = null;
      document.getElementById("price").value = "";
      document.getElementById("details").value = "";

      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}

function sortTable(n, evt) {
  let table = document.querySelector("table");
  let thead = document.querySelector("thead");
  let tbody = document.querySelector("tbody");
  let bRows = [...tbody.rows];
  let hData = [...thead.querySelectorAll("th")];
  let desc = false;

  hData.map((head) => {
    if (head != evt) {
      head.classList.remove("asc", "desc");
    }
  });

  desc = evt.classList.contains("asc") ? true : false;
  evt.classList[desc ? "remove" : "add"]("asc");
  evt.classList[desc ? "add" : "remove"]("desc");

  tbody.innerHTML = "";

  if (n == 0 || n == 3) {
    bRows.sort((a, b) => {
      let x = Number(a.getElementsByTagName("td")[n].innerHTML.toLowerCase());
      let y = Number(b.getElementsByTagName("td")[n].innerHTML.toLowerCase());

      return desc ? (x < y ? 1 : -1) : x < y ? -1 : 1;
    });
  } else {
    bRows.sort((a, b) => {
      let x = a.getElementsByTagName("td")[n].innerHTML.toLowerCase();
      let y = b.getElementsByTagName("td")[n].innerHTML.toLowerCase();
      return desc ? (x < y ? 1 : -1) : x < y ? -1 : 1;
    });
  }

  bRows.map((bRow) => {
    tbody.appendChild(bRow);
  });
}
