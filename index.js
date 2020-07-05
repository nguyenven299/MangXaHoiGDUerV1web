const firebaseConfig = {
  apiKey: "AIzaSyBPBJ6z5MxcfcCHHuwaOyqLYmeHW7NfkV4",
  authDomain: "mangxahoi-gdu.firebaseapp.com",
  databaseURL: "https://mangxahoi-gdu.firebaseio.com",
  projectId: "mangxahoi-gdu",
  storageBucket: "mangxahoi-gdu.appspot.com",
  messagingSenderId: "164363735011",
  appId: "1:164363735011:web:9b03134dd5d7630b509ad6",
  measurementId: "G-Y63QF5M5B0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function login() {

  var db = firebase.firestore();
  var docRef = db.collection("Admin").doc("loginAdmin");
  docRef.get().then(function (doc) {
    if (doc.data().email == account_field.value && doc.data().password == passwordadmin_field.value) {
      window.location.href = "home.html"
    }

    else {
      window.alert("Mật khẩu hoặc tài khoản không chính xác");
    }
  });
}


function logout() {
  // console.log("logout");
  // firebase.auth().signOut().then(function () {
  //   // Sign-out successful.
  //   window.location.href = "loginadmin.html";
  // }).catch(function (error) {
  //   // An error happened.
  // });
  window.location.href = "index.html";
}


async function getAllUser() {
  var html = "";

  await db.collection("GV").get().then((querySnapshot) => {

    querySnapshot.forEach((doc) => {

      html += `<tr>
               <td scope="row">${doc.data().MSGV}</td>
               
               <td> ${doc.data().Ho_Ten}</td>
              <td>${doc.data().Email}</td>
              <td>${doc.data().SDT}</td>
              <td>${doc.data().Nganh_Day}</td>
            <td><button  type="button" class="btn btn-primary" onclick="suaUser('${doc.data().uid}')">Sửa</button></td>
            
            </tr>`



    });
  });
  return html;
}

function suaUser(uid) {

  localStorage.setItem("MSGV", uid);
  window.location.href = "loginToEditUser.html";

}

function taoUserMoi() {

  window.location.href = "addUser.html"
}



function cancleEdit() {
  console.log("logout");
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    window.location.href = "home.html";
  }).catch(function (error) {
    // An error happened.
  });
}

async function access() {
  //   db.collection("cities").doc("LA").set({
  //     name: "Los Angeles",
  //     state: "CA",
  //     country: "USA"
  // })
  // .then(function() {
  //     console.log("Document successfully written!");
  // })
  // .catch(function(error) {
  //     console.error("Error writing document: ", error);
  // });
  var db = firebase.firestore();
  var pass1 = document.getElementById("password_field").value;
  var pass2 = document.getElementById("password2_field").value;
  var id = document.getElementById("id_field").value; // id trong cho txt khi nhap phai dung roi ong
  var fullname = document.getElementById("fullname_field").value;
  var email = document.getElementById("email_field").value;
  var phonenumber = document.getElementById("sdt_field").value;
  var career = document.getElementById("career_field").value;
  // console.log("email", email);
  if (pass1 != pass2) {
    window.alert("Vui lòng nhập mật khẩu giống nhau")
  }
  else if (pass1 == pass2 && fullname.length > 5 && email.length > 5 && phonenumber.length > 5 && career.length >= 5) {
    // firebase.auth().createUserWithEmailAndPassword(email, pass1).catch(function(error) {
    // // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // // ...
    // });





    var checkId = "";
    db.collection("GV").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        checkId = `${doc.data().MSGV}`; //nay la lay id trong database ne, lay toan bo id luon a 
      });
      if (id == checkId) {
        window.alert("Nhập lại mã số của bạn\nMã đã bị trùng")
      }
      else {

        try {
          const user = firebase.auth().createUserWithEmailAndPassword(email, pass1);

          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.userId = user.uid
              console.log(user.uid)
              db.collection("GV").doc(userId).set({
                uid: userId,
                "MSGV": id,
                "Ho_Ten": fullname,
                "Email": email,
                "SDT": phonenumber,
                "Nganh_Day": career,
                "Anh_Dai_Dien": "default"


              })
                .then(function (docRef) {
                  this.alert("Đăng ký thành công")
                  window.location.href = "home.html"
                });


              // const back = document.getElementById('cancleAddUser')
              // back.innerText = "Trở Về"
              //document.getElementById("cancleAddUser").innerText = "Trở về
              // }).catch(function(error) {
              //   console.error("Error writing document: ", error);
              //return 0;


            }
          })
        }
        catch (error) {
          console.log(error.message)
        }
      }

    });






    // firebase.auth().createUserWithEmailAndPassword(email, pass2)
    //   .then(function (user) {
    //     var uid = 

    //   }).catch(function (error) {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     window.alert("Có vẻ có lỗi! \nVui lòng thử lại" + errorCode + errorMessage);
    //   });

  }
  else {
    window.alert("Vui lòng nhập đầy đủ thông tin")
  };


}
function cancle() {
  console.log("logout");
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    window.location.href = "home.html";
  }).catch(function (error) {
    // An error happened.
  });
}
function update() {

  var id = document.getElementById("id_field").value;
  var fullname = document.getElementById("fullname_field").value;
  var email = document.getElementById("email_field").value;
  var phonenumber = document.getElementById("sdt_field").value;
  var career = document.getElementById("career_field").value;
  var washingtonRef = db.collection("GV").doc(iddoc);
  // var idTam = id_field.value;

  // const idChinh = idTam;
  // console.log(idChinh);
  var user = firebase.auth().currentUser;
  // Set the "capital" field of the city 'DC'
  if (fullname.length > 5 && email.length > 5 && phonenumber.length > 5 && career.length >= 5) {


    db.collection("GV").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        checkId = `${doc.data().id}`;
        console.log(checkId);

        try {
          user.updateEmail(email).then(function () {

            return washingtonRef.update({
              "MSGV": id,
              "Ho_Ten": fullname,
              "Email": email,
              "SDT": phonenumber,
              "Nganh_Day": career,
              "Anh_Dai_Dien": "default"

            })
              .then(function () {
                firebase.auth().on
                console.log("Document successfully updated!");
                alert("Cập nhật thông tin thành công")
                document.getElementById("btnCancle").innerText = "Trở về"
              }).then(function () {
                // Update successful0
                // check ="updated"
                // alert("Cập nhật thành công")


              }).catch(function (error) {
                // An error happened.
              });
          }).catch(function (error) {
            alert("cập nhập thất bại");
          });
        }
        catch (error) {
          console.log(error.message)
        }

      });

    });

  }
  else {
    alert("Vui lòng nhập đúng thông tin")

  }






}


function updatePass() {
  var pass1 = document.getElementById("password_field").value;
  var pass2 = document.getElementById("password2_field").value;
  var user = firebase.auth().currentUser;


  if (pass1.length < 6 && pass2.length < 6) {
    window.alert("Vui lòng nhập mật khẩu cần thay đổi")
  }
  else {
    if (pass1.value == pass2.value) {

      // var washingtonRef = db.collection("GV").doc(iddoc);
      // // Set the "capital" field of the city 'DC'
      // return washingtonRef.update({
      //   password: pass1
      // })
      //   .then(function () {
      //     capital: true

      //   }).then(function () {
      user.updatePassword(pass1).then(function () {
        alert("Cập nhật mật khẩu thành công")
        document.getElementById("cancleUpdatePass").innerText = "Trở về"
        document.getElementById("btnCancle").innerText = "Trở về"
      }).catch(function (error) {
        // An error happened.
        // });

      }).catch(function (error) {
        // An error happened.
        window.alert("Có vẻ có lỗi! \nVui lòng thử lại")
      });

    }
    else {
      window.alert("Vui lòng nhập đúng mật khẩu")
    }
  }

}
function loginUser() {
  var user = firebase.auth().currentUser;
  var email = document.getElementById("accountUser_field").value;
  var password = document.getElementById("passwordUser_field").value;
  console.log("??", email + password)
  if (email.length > 5 && password.length > 5) {



    firebase.auth().signInWithEmailAndPassword(email, password)

      .catch(function (error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        // window.location.href("home.html");
        // ...
        //                     console.log("Erổ:", errorCode + errorMessage);
        if (errorCode === 'auth/wrong-password') {
          alert('Mật khẩu sai');
        }
        else {
          alert(errorMessage);

        }


      }
      );
  }
  else {
    window.alert("Vui lòng nhập đầy đủ thông tin!")
  }
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = "editUser.html"
    } else {
      // No user is signed in.
    }
  });

}
