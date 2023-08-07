var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var alertName = document.getElementById("alertName");
var existsName = document.getElementById("existsName");
var alertUrl = document.getElementById("alertUrl");
var siteList = [];
if (localStorage.getItem("siteList")) {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  displaySite(siteList);
}
function addSite() {
  if (isValidHttpUrl() && testValidTotal()) {
    var siteOb = {
      name: siteName.value,
      url: siteUrl.value,
    };
    siteList.push(siteOb);
    localStorage.setItem("siteList", JSON.stringify(siteList));
    displaySite(siteList);
    clear();
  }
}
function displaySite(list) {
  dataContainer = ``;
  for (var i = 0; i < list.length; i++) {
    dataContainer += `<tr>
      <td>${i + 1}</td>
      <td>${list[i].name}</td>
      <td><a class="btn btn-warning" id="visitBtn"  href="${
        list[i].url
      }" ><i class="text-white fa-solid fa-eye pe-2"></i> Visit</a></td>
      <td><button class="btn btn-danger" onclick="deleteSite(${i})"> <i class="text-white fa-solid fa-trash-can pe-2" ></i> Delete</button></td>
    </tr>`;
    // }
  }
  document.getElementById("tableId").innerHTML = dataContainer;
}
function clear() {
  siteName.value = "";
  siteUrl.value = "";
}
function deleteSite(index) {
  siteList.splice(index, 1);
  displaySite(siteList);
  localStorage.setItem("siteList", JSON.stringify(siteList));
}
function isValidHttpUrl() {
  var urlError = document.getElementById("siteUrl");
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );

  if (pattern.test(siteUrl.value)) {
    urlError.classList.replace("is-invalid", "is-valid");
    alertUrl.classList.replace("d-block", "d-none");
    return true;
  } else {
    urlError.classList.add("is-invalid");
    alertUrl.classList.replace("d-none", "d-block");
    return false;
  }
}
function validateName() {
  var regex = /^[A-Z][A-Za-z]{0,}$/;
  var nameError = document.getElementById("siteName");
  if (regex.test(siteName.value)) {
    nameError.classList.replace("is-invalid", "is-valid");
    alertName.classList.replace("d-block", "d-none");
    return true;
  } else {
    nameError.classList.add("is-invalid");
    alertName.classList.replace("d-none", "d-block");
    return false;
  }
}
function validateNameExists() {
  var testLoc = JSON.parse(localStorage.getItem("siteList"));
  var nameError = document.getElementById("siteName");
  for (var i = 0; i < testLoc.length; i++) {
    if (siteName.value == testLoc[i].name) {
      nameError.classList.add("is-invalid");
      existsName.classList.replace("d-none", "d-block");
      return false;
    } else {
      nameError.classList.replace("is-invalid", "is-valid");
      existsName.classList.replace("d-block", "d-none");
    }
  }
  return true;
}
function testValidTotal() {
  if (validateNameExists() && validateName()) {
    return true;
  } else {
    return false;
  }
}
