(function () {
    let btnAddFolder = document.querySelector("#btnAddFolder");
    let divContainer = document.querySelector("#divContainer");
    let pageTemplates = document.querySelector("#pageTemplates");
    let breadCrumb = document.querySelector("#divBreadCrumb");
    let folders = [];
    let fid = -1;
    let cfid = -1
    let pid = -1;

    btnAddFolder.addEventListener("click", addFolder);

    function viewFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose ='name']");
        cfid = parseInt(divFolder.getAttribute("fid"));

        let aPathTemplate = pageTemplates.content.querySelector(".path");
        let aPath = document.importNode(aPathTemplate, true);

        aPath.innerHTML = divName.innerHTML;
        breadCrumb.appendChild(aPath);

        divContainer.innerHTML = "";
        folders.filter(f => f.pid === cfid).forEach(f => {
            addFolderHTML(f.name, f.id,f.pid);
        })


    }

    function addFolder() {
        let fname = prompt("Enter folder's name");
        if (!!fname) {
            let exists = folders.some(f => f.name === fname);
            if (exists === false) {
                fid++;
                folders.push({
                    id: fid,
                    name: fname
                });
                addFolderHTML(fname, fid);
                saveToStorage();
            } else {
                alert(fname + " already exists");
            }
        } else {
            alert("Please enter a name");
        }
    }

    function editFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");
        let ofname = divName.innerHTML;

        let nfname = prompt("Enter new name for " + ofname);
        if (!!nfname) {
            if (nfname !== ofname) {
                let exists = folders.some(f => f.name === nfname);
                if (exists === false) {
                    // ram
                    let folder = folders.find(f => f.name === ofname);
                    folder.name = nfname;

                    // html
                    divName.innerHTML = nfname;

                    // storage
                    saveToStorage();
                } else {
                    alert(nfname + " already exists");
                }
            } else {
                alert("This is the old name only. Please enter something new.");
            }
        } else {
            alert("Please enter a name");
        }
    }


    function deleteFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");

        let flag = confirm("Are you sure you want to delete " + divName.innerHTML + "?");
        if (flag === true) {
            // ram
            let fidx = folders.findIndex(f => f.name === divName.innerHTML);
            folders.splice(fidx, 1);

            // html
            divContainer.removeChild(divFolder);

            // storage
            saveToStorage();
        }
    }

    function addFolderHTML(fname, fid) {
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        let spanEdit = divFolder.querySelector("[action='edit']");
        let spanDelete = divFolder.querySelector("[action='delete']");
        let spanView = divFolder.querySelector("[action = 'view']");

        divFolder.setAttribute("fid", fid);
        divName.innerHTML = fname;
        spanEdit.addEventListener("click", editFolder);
        spanDelete.addEventListener("click", deleteFolder);
        spanView.addEventListener("click", viewFolder);

        divContainer.appendChild(divFolder);
    }

    function saveToStorage() {
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }

    function loadFromStorage() {
        let fjson = localStorage.getItem("data");
        if (!!fjson) {
            folders = JSON.parse(fjson);
            folders.forEach(f => {
                if (f.id > fid) {
                    fid = f.id;
                }

                addFolderHTML(f.name, f.id);
            });
        }
    }

    loadFromStorage();
})();