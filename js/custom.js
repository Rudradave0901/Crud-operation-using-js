// All Globle Variable is here

// buttons Variables
let addbtn = document.getElementById("add-btn");
let modelclose = document.querySelector(".btn-close");
let registerbtn = document.getElementById("register-btn");
let updatebtn = document.getElementById("update-btn");
let clearpage = document.getElementById("clear-page");
let editbtn = document.getElementsByClassName("edit-btn");

// Input Field Variables
let fnameEL = document.getElementById("fname");
let lnameEL = document.getElementById("lname");
let emailEL = document.getElementById("email");
let mobileEL = document.getElementById("mobile");
let myform = document.getElementById("myform");
let allinput = myform.querySelectorAll("input");

// Profile Image Variable
let profile_pic = document.getElementById("profile-pic");
let upload_pic = document.getElementById("profile-pic-input");
let imgurl;

// Store Data In Local Storage
let userdata = [];

// Table All Data Variable
let tabledata = document.getElementById("tabledata");

// Delete All Records JS
clearpage.addEventListener("click", () => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this All Records!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      localStorage.removeItem("userdata");
      window.location = location.href;
      swal("All Records has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your Record is safe!");
    }
  });
});

modelclose.addEventListener("click", function () {
  let i;
  for (i = 0; i < allinput.length; i++) {
    allinput[i].value = "";
  }
  location.reload();
});

// Register Button JS
$(document).ready(function () {
  registerbtn.onclick = function (e) {
    $("#myform").validate({
      rules: {
        fname: {
          required: true,
          lettersOnly: true,
        },
        lname: {
          required: true,
          lettersOnly: true,
        },
        email: {
          required: true,
          email: true,
        },
        mobile: {
          required: true,
          digits: true,
          minlength: 10,
        },
      },
      messages: {
        fname: {
          required: "Please enter your first name",
          lettersOnly: "Please enter only letters for your first name",
        },
        lname: {
          required: "Please enter your last name",
          lettersOnly: "Please enter only letters for your last name",
        },
        email: {
          required: "Please enter your email address",
          email: "Please enter a valid email address",
        },
        mobile: {
          required: "Please enter your mobile number",
          digits: "Please enter only digits",
          minlength: "Please enter at least 10 digits",
        },
      },
      submitHandler: function (form) {
        e.preventDefault();
        registrationdata();
        getdatafromlocal();
        myform.reset("");
        modelclose.click();
      },
    });
  };
  // Custom method to check if the input contains only letters
  $.validator.addMethod("lettersOnly", function(value, element) {
    return this.optional(element) || /^[a-zA-Z,. ]+$/i.test(value);
}, "Please enter only letters");
});

// Store Data From userString To userdata
if (localStorage.getItem("userdata") != null) {
  userdata = JSON.parse(localStorage.getItem("userdata"));
}

// Push Data to localStorage
function registrationdata() {
  userdata.push({
    fname: fnameEL.value,
    lname: lnameEL.value,
    email: emailEL.value,
    mobile: mobileEL.value,
    profilepic:
      imgurl == undefined
        ? "https://cdn.vectorstock.com/i/preview-1x/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.webp"
        : imgurl,
  });
  let userString = JSON.stringify(userdata);
  localStorage.setItem("userdata", userString);
  swal("Good job!", "Registration Success", "success");
}

// Start Returning Data On Page From localStorage
const getdatafromlocal = () => {
  tabledata.innerHTML = "";
  userdata.forEach((data, index) => {
    tabledata.innerHTML += `
            <tr index=${index}>
                <td class="col border-1">${index + 1}</td>
                <td class="col border-1"><img src="${
                  data.profilepic
                }" heigth="60" width="60"></td>
                <td class="col border-1">${data.fname}</td>
                <td class="col border-1">${data.lname}</td>
                <td class="col border-1">${data.email}</td>
                <td class="col border-1">${data.mobile}</td>
                <td class="col d-lg-flex border-1">
                    <button class="btn btn-primary edit-btn w-100 mx-1 my-lg-0 my-1" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">&ShortRightArrow; Edit</button>
                    <button class="btn btn-danger delele-btn w-100 mx-1">&cross; Delete</button>
                </td>
            </tr>
        `;
  });

  // Delete Button JS
  let i;
  let delelebtn = document.getElementsByClassName("delele-btn");
  for (i = 0; i < delelebtn.length; i++) {
    delelebtn[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let id = tr.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userdata.splice(id, 1);
          localStorage.setItem("userdata", JSON.stringify(userdata));
          tr.remove(id);
          swal("Record has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Record is safe!");
        }
      });
    };
  }

  // Update Record JS
  let editbtn = document.getElementsByClassName("edit-btn");
  for (i = 0; i < editbtn.length; i++) {
    editbtn[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let td = tr.getElementsByTagName("td");
      let index = tr.getAttribute("index");
      let imgtag = td[1].getElementsByTagName("img");
      let profilepicc = imgtag[0].src;
      let fname = td[2].innerHTML;
      let lname = td[3].innerHTML;
      let email = td[4].innerHTML;
      let phone = td[5].innerHTML;
      updatebtn.disabled = false;
      registerbtn.disabled = true;
      fnameEL.value = fname;
      lnameEL.value = lname;
      emailEL.value = email;
      mobileEL.value = phone;
      profile_pic.src = profilepicc;

      updatebtn.onclick = (e) => {
        $(document).ready(function() {
            if($("#myform").valid()){
                userdata[index] = {
                  fname: fnameEL.value,
                  lname: lnameEL.value,
                  email: emailEL.value,
                  mobile: mobileEL.value,
                  profilepic: upload_pic.value == "" ? profile_pic.src : imgurl,
                };
                localStorage.setItem("userdata", JSON.stringify(userdata));
                e.preventDefault();
                modelclose.click();
                location.reload();
            }
        })

      };

    //   Jquery Validation For Edit And Update
    $(document).ready(function() {
        $("#myform").validate({
            rules: {
                fname: {
                    required: true,
                    lettersOnly: true
                },
                lname: {
                    required: true,
                    lettersOnly: true
                },
                email: {
                    required: true,
                    email: true
                },
                mobile: {
                    required: true,
                    digits: true,
                    minlength: 10
                }
            },
            messages: {
                fname: {
                    required: "Please enter your first name",
                    lettersOnly: "Please enter only letters for your first name"
                },
                lname: {
                    required: "Please enter your last name",
                    lettersOnly: "Please enter only letters for your last name"
                },
                email: {
                    required: "Please enter your email address",
                    email: "Please enter a valid email address"
                },
                mobile: {
                    required: "Please enter your mobile number",
                    digits: "Please enter only digits",
                    minlength: "Please enter at least 10 digits"
                }
            }
        });
    
        // Custom method to check if the input contains only letters
        $.validator.addMethod("lettersOnly", function(value, element) {
            return this.optional(element) || /^[a-zA-Z,. ]+$/i.test(value);
        }, "Please enter only letters");
    });

    };
  }
};
getdatafromlocal();

// To Disable Update And Register button When Add record And Edit Record
addbtn.onclick = () => {
  updatebtn.disabled = true;
  registerbtn.disabled = false;
};

editbtn.onclick = () => {
  updatebtn.disabled = false;
  registerbtn.disabled = true;
};

// Image Processing To Show Upload
upload_pic.onchange = function () {
  if (upload_pic.files[0].size < 2000000) {
    let freader = new FileReader();
    freader.onload = function (e) {
      imgurl = e.target.result;
      profile_pic.src = imgurl;
    };
    freader.readAsDataURL(upload_pic.files[0]);
  } else {
    alert("File Is Too Large");
  }
};
