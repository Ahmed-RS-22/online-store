let allInputs=document.querySelectorAll("form input:not(input[type='submit']")
let username =document.querySelector("#username") 
let password =document.querySelector("#password") 
let signinBtn=document.getElementById("signIn")
let getUsername =localStorage.getItem("username")
let getPassword =localStorage.getItem("password")
signinBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    for(i of allInputs){
        if(i.value==""){
            alert("please fill all fields")
            allInputs.forEach((ele)=> {
                ele.addEventListener("blur",()=>ele.classList.remove("error"))
                if(ele.value ==""){
                    ele.classList.add("error")
                }else{
                    ele.classList.remove("error")
                }
            })
            return;
            }else{
                if(getUsername && getUsername.trim() === username.value.trim() && getPassword && getPassword.trim() === password.value){
                    setTimeout(() => {
                        window.location="index.html"
                        
                    }, 1500);
                    return;
                }else{
                    alert("wrong passowrd or username ")
                    return;
                }
            }
            
    }

})
