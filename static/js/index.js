document.getElementById("states").addEventListener("mousedown",function(){
    let dropDown =  document.getElementById("states");
    const req = new XMLHttpRequest();
    
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            let textNode = this.responseText;
            // textNode = JSON.stringify(textNode);
            let obj = JSON.parse(textNode);
            for (const key in obj){
                if(obj.hasOwnProperty(key)){
                    for(let index = 0; index < obj[key].length; index++){
    
                            let nodeToBeAppended = document.createElement("option");
                            nodeToBeAppended.value = obj[key][index]["state_id"];
                            nodeToBeAppended.text = obj[key][index]["state_name"];
                            dropDown.appendChild(nodeToBeAppended);

                    }
                }
                    
            }
            
        }
    };
    req.open("GET","https://cdn-api.co-vin.in/api/v2/admin/location/states",true);
    req.send();

})



document.getElementById("states").addEventListener("change",function(){
    let dropDown =  document.getElementById("district");
    const req = new XMLHttpRequest();
    let stateDropDown = document.getElementById("states");
    id = stateDropDown.value;
        
    //e.firstElementChild can be used.

    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            let child = dropDown.lastElementChild; 
            while (child) {
                dropDown.removeChild(child);
                child = dropDown.lastElementChild;
            }
            let textNode = this.responseText;
            // textNode = JSON.stringify(textNode);
            let obj = JSON.parse(textNode);
            for (const key in obj){
                if(obj.hasOwnProperty(key) && id != 0){
                   
                    for(let index = 0; index < obj[key].length; index++){
                       
                            let nodeToBeAppended = document.createElement("option");
                            nodeToBeAppended.value = obj[key][index]["district_id"];
                            nodeToBeAppended.text = obj[key][index]["district_name"];
                            dropDown.appendChild(nodeToBeAppended);
    
                    }
                }
                    
            }
            
        }
    };
    req.open("GET",`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`,true);
    req.send();

})



// document.getElementById("")