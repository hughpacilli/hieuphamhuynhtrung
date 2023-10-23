// Constant URL value for API
const API_URL = 'http://localhost:7000/api/menu/items';
// Object with Content-Type header
const REQUEST_HEADERS = {'Content-Type': 'application/json'};

let getItems= async () => {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    
    fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        for (const item of data) {
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = item.id;
            cell2 = newRow.insertCell(1);
            cell2.innerHTML = '<a href="./details.html?id='+ item.id +'">'+ item.name + '</a>';
            cell3 = newRow.insertCell(2);
            cell3.innerHTML = item.price;
            cell4 = newRow.insertCell(3);
            cell4.innerHTML = item.description;
            cell4.style.display = "none";
            cell5 = newRow.insertCell(4);
            cell5.innerHTML = `<img src="`+ item.image +`" width="75">`;
            cell6 = newRow.insertCell(5);
            cell6.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
        }})
    }
    
    getItems();
    
    var selectedRow = null;
    
    function onFormSubmit(e) {
        e.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
        }
        else{
            updateRecord(formData);
        }
        resetForm();
    }
    
    //Retrieve the data
    function readFormData() {
        var formData = {};
        formData["itemName"] = document.getElementById("item-name").value;
        formData["price"] = document.getElementById("price").value;
        formData["description"] = document.getElementById("description").value;
        formData["image"] = document.getElementById("image").value;
        return formData;
    }
    
    //Insert the data
    function insertNewRecord(data) {
        const item = {
            name: data.itemName, 
            price: data.price, 
            description: data.description,
            image: data.image
        };
        
        // Making a POST request using an axios instance from a connected library
        axios.post(API_URL, item, { headers: REQUEST_HEADERS })
        // Handle a successful response from the server
        .then(response => {
            // Getting a data object from response that contains the necessary data from the server
            const responseData = response.data;
            console.log('data', responseData);
        })
        // Catch and print errors if any
        .catch(error => console.error('On create item error', error));
        
        getItems();
    }
    
    //Edit the data
    function onEdit(td) {
        selectedRow = td.parentElement.parentElement;
        document.getElementById("item-name").value = selectedRow.cells[1].innerHTML;
        document.getElementById("price").value = selectedRow.cells[2].innerHTML;
        document.getElementById("description").value = selectedRow.cells[3].innerHTML;
        var imgStr= selectedRow.cells[4].innerHTML.split(/["]/);
        document.getElementById("image").value = imgStr[1];
    }
    
    function updateRecord(formData) {
        const itemID= selectedRow.cells[0].innerHTML;
        
        const item = {
            name: formData.itemName, 
            price: formData.price, 
            description: formData.description,
            image: formData.image
        };
        
        // Making a POST request using an axios instance from a connected library
        axios.put(API_URL +'/'+ itemID, item, { headers: REQUEST_HEADERS })
        // Handle a successful response from the server
        .then(response => {
            // Getting a data object from response that contains the necessary data from the server
            const responseData = response.data;
            console.log('data', responseData);
        })
        // Catch and print errors if any
        .catch(error => console.error('On update item error', error));
        
        getItems();
    }
    
    //Delete the data
    function onDelete(td) {
        if (confirm('Do you want to delete this record?')) {
            row = td.parentElement.parentElement;
            
            axios.delete(API_URL +'/'+ row.cells[0].innerHTML)
            // Handle a successful response from the server
            .then(response => {
                console.log('Deleted item with ID '+ row.cells[0].innerHTML);
            })
            // Catch and print errors if any
            .catch(error => console.error('On delete item error', error));
            
            resetForm();
        }
        
        getItems();
    }
    
    //Reset the data
    function resetForm() {
        document.getElementById("item-name").value = '';
        document.getElementById("price").value = '';
        document.getElementById("description").value = '';
        document.getElementById("image").value = '';
        selectedRow = null;
    }
    
    function onSearch() {
        event.preventDefault();
        
        const search= document.getElementById("search").value;
        
        if (!search) {
            getItems();
        }
        
        var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
        table.innerHTML = "";
        
        fetch('http://localhost:7000/api/menu/query?search='+ search)
        .then((response) => response.json())
        .then((data) => {
            for (const item of data) {
                var newRow = table.insertRow(table.length);
                cell1 = newRow.insertCell(0);
                cell1.innerHTML = item.id;
                cell2 = newRow.insertCell(1);
                cell2.innerHTML = '<a href="./details.html?id='+ item.id +'">'+ item.name + '</a>';
                cell3 = newRow.insertCell(2);
                cell3.innerHTML = item.price;
                cell4 = newRow.insertCell(3);
                cell4.innerHTML = item.description;
                cell4.style.display = "none";
                cell5 = newRow.insertCell(4);
                cell5.innerHTML = `<img src="`+ item.image +`" width="75">`;
                cell6 = newRow.insertCell(5);
                cell6.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
            }})
        }