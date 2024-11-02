let allInputs=document.querySelectorAll("form input:not(input[type='submit']")
let username =document.querySelector("#username") 
let email =document.querySelector("#email") 
let password =document.querySelector("#password") 
let regBtn=document.getElementById("signUp")
regBtn.addEventListener("click",(e)=>{
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
                localStorage.setItem("username",username.value.trim())
                localStorage.setItem("email",email.value.trim())
                localStorage.setItem("password",password.value.trim())
            }
    }
    setTimeout(() => {
        window.location = "log-in.html"
    }, 1500);
})
