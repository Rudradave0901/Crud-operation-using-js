// Form Validation
// $(document).ready(function() {
//     $("#myform").validate({
//         rules: {
//             fname: {
//                 required: true,
//                 lettersOnly: true
//             },
//             lname: {
//                 required: true,
//                 lettersOnly: true
//             },
//             email: {
//                 required: true,
//                 email: true
//             },
//             mobile: {
//                 required: true,
//                 digits: true,
//                 minlength: 10
//             }
//         },
//         messages: {
//             fname: {
//                 required: "Please enter your first name",
//                 lettersOnly: "Please enter only letters for your first name"
//             },
//             lname: {
//                 required: "Please enter your last name",
//                 lettersOnly: "Please enter only letters for your last name"
//             },
//             email: {
//                 required: "Please enter your email address",
//                 email: "Please enter a valid email address"
//             },
//             mobile: {
//                 required: "Please enter your mobile number",
//                 digits: "Please enter only digits",
//                 minlength: "Please enter at least 10 digits"
//             }
//         }
//     });

//     // Custom method to check if the input contains only letters
//     $.validator.addMethod("lettersOnly", function(value, element) {
//         return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
//     }, "Please enter only letters");
// });






$(document).ready(function () {
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
    },
  });
  // Custom method to check if the input contains only letters
  $.validator.addMethod(
    "lettersOnly",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z,. ]+$/i.test(value);
    },
    "Please enter only letters"
  );
});
