let resetBtn = document.getElementById("resetBtn");
let submitBtn = document.getElementById("submitBtn");
let inputField = document.getElementById("inputPin");


submitBtn.addEventListener("click",()=>{
    let pinCode = inputField.value;
    let form = document.querySelectorAll(".nav-container")[0];
    // form.style = "border-bottom:none";
    // let letters = [0-9];
    let footer = document.getElementById("footer");
    const regex = /^[0-9]{1,6}$/;
    if(regex.test(pinCode) && pinCode.length == 6){
        const req = new XMLHttpRequest();
        form.style = "border-bottom:none";
        req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            tableHeadingSection = document.getElementById('resultTableHeading');
            tableBodySection = document.getElementById('resultTableBody');
            tableHeadingRow = document.createElement("tr");
            // footer.style = "display:block;
            tableHeadingEntities = ` <th scope="col">#</th>
            <th scope="col">Branch Name</th>
            <th scope="col">Branch Type</th>
            <th scope="col">District</th>`;

            responseOfReq = JSON.parse(this.responseText);
            tableBodyEntities = ``;
            if(responseOfReq[0].PostOffice == null)
            {
                document.getElementById("innerContent").innerText = "No such PIN Code exists !";
                document.getElementById("errorMsg").style="display:block;";
            }
            else{
            for (const key in responseOfReq) {
                tableHeadingSection.innerHTML = tableHeadingEntities;
                if (Object.hasOwnProperty.call(responseOfReq, key)) {
                    postofficeArrLen = responseOfReq[0].PostOffice.length;
                    for(let i = 0; i < postofficeArrLen;i++){
                        branchName = responseOfReq[0]["PostOffice"][i]["Name"];
                        branchType = responseOfReq[0]["PostOffice"][i]["BranchType"];
                        district = responseOfReq[0]["PostOffice"][i]["District"];
                        tableBodyEntities = tableBodyEntities + `<tr>
                        <th>${i+1})</th>
                        <th>${branchName}</th>
                        <th>${branchType}</th>
                        <th>${district}</th>
                        </tr>`;
                    }
                }
                tableBodySection.innerHTML = tableBodyEntities;
                // document.getElementById("btnContainer").style = "display:block;"
                
            }    
         }        
            
    
        }
    }
    req.open("GET",`https://api.postalpincode.in/pincode/${pinCode}`,true);
    req.send();
    }
    else if(pinCode.length === 0){
        document.getElementById("innerContent").innerText = "Please fill the input field !";
        document.getElementById("errorMsg").style="display:block;";
       
    }
    else if(pinCode.length != 6){
        document.getElementById("innerContent").innerText = "Invalid PIN Code !";
        document.getElementById("errorMsg").style="display:block;";
    }
    else if(!regex.test(pinCode)){
        document.getElementById("innerContent").innerText = "Invalid PIN Code !";
        document.getElementById("errorMsg").style="display:block;";
    }


});

resetBtn.addEventListener("click",()=>{
    inputField.value = "";
    document.getElementById("errorMsg").style="display:none;";
    document.getElementById('resultTableHeading').innerHTML = "";
    document.getElementById('resultTableBody').innerHTML = "";
    document.querySelector(".nav-container").style = " border-bottom:0.1em solid rgb(201, 194, 194)";
    document.getElementById("footer").style = "position:fixed;display:block;"
    document.getElementById("btnContainer").style = "display:none";

})


document.getElementById("downloadbtn").addEventListener("click",()=>{
    sessionStorage.setItem("pincode",inputField.value);
    window.location = `/download`;
})