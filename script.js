(function(){
    let btn = document.querySelector("#myFirstButton");
    let divContainer = document.querySelector("#container");
    let myTemplates = document.querySelector("#myTemplates");

    btn.addEventListener("click", function(){
        let fname = prompt("Enter a folder's name");
        if(!fname){
            return;
        }
        
        let divFolderTemplate = myTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        divName.innerHTML = fname;

        divContainer.appendChild(divFolder);

        let spanEdit = divFolder.querySelector("span[action='edit']");
        spanEdit.addEventListener("click", function(){
            let changedName = prompt("Enter new name for " + fname + " folder");
            divName.innerHTML = changedName;
            fname = changedName;
            if(!fname){
                return;
            }
        })

        let spanDelete = divFolder.querySelector("span[action='delete']");
        spanDelete.addEventListener("click", function(){
          let flag = confirm("Do you want to delete the folder? " + fname);
          if(flag == true){
              divContainer.removeChild(divFolder);
          }
        })

        
    })

})();