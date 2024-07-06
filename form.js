const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");    


        inputs.forEach((inp) => {
            inp.addEventListener("focus", () => {
                inp.classList.add("active");
            });
            inp.addEventListener("blur", () => {
                if(inp.value != "") return;
                inp.classList.remove("active");
            });
        });

        toggle_btn.forEach(btn =>{
            btn.addEventListener("click", () =>{
                main.classList.toggle("sign-up-mode");
            });
        });




        const firebaseConfig = {
            apiKey: "AIzaSyAnwduSIaGVCsD62sL3ycsOMjXyl4BQz8o",
            authDomain: "login-sign-up-from.firebaseapp.com",
            projectId: "login-sign-up-from",
            storageBucket: "login-sign-up-from.appspot.com",
            messagingSenderId: "991458296196",
            appId: "1:991458296196:web:885b71f091fe381c979dd1",
            measurementId: "G-18MVTEZJ2P"
          };
        
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          
          //initialise variables
          const auth = firebase.auth();;
          const database = firebase.database();

          // set up register function
          function register(){
            // get all our input fields

            email = document.getElementById('email').value;
            name = document.getElementById('name').value;
            password = document.getElementById('password').value;


            //validate input field
            if(validate_email(email) == false || validate_password(password) == false || validate_field(name) == false){
                return alert('You have not an account please create an account');
                // don't contunue running the code
            }
            auth.createUserWithEmailAnPassword(email , password)
            .then(function(){
                var user = auth.currentUser

                //add this user to  firebase database
                var database_ref = database.ref();

                var user_data = {
                    email : email,
                    name : name,
                    last_login : Date.now()
                }
                database_ref.child('users/' + user.uid).set(user_dtaa);

            })
            .catch(function(error){
                //firebase will use  this to alert of its error
                var error_code = error.code;
                var error_message = error.message;

                alert(error_message);

            })

          }


          function validate_email(email){
            const expression = /^[^@]+@\w+(\.\w+)+\w$/
            if(expression.test(email) == true){
                //email is good
                return true;
            }else{
                //email is not good
                return false;
            }
          }

          function validate_password(password){
            //fire base only accept length greater gthan 6
            if(password < 6){
                return false;
            }else{
                return true;
            }
          }

          function validate_field(field){
            if(field == null){
                return false;
            }

            if(field.length <= 0){
                return false;
            }else{
                return true;
            }
          }