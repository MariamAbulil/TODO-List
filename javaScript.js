/* TODO */
/* TODO: remove and clean unneeded code. */

/* TODO replace these values to const */
let desc =document.getElementById('desc');
let userId =document.getElementById('userId');
let status1 =document.getElementById('status1');
let btn=document.getElementById('btn');

let dataArr ;
/* console.log(desc,userId,status1); */
btn.onclick=async()=> {

    /* TODO:
    convert the code from line 17 to 24 to function since you use it in three places and make it revert the dataArr 
    */
    if(localStorage.array!=null){
        dataArr=JSON.parse(localStorage.getItem("array"));
    }
    else{
        let response = await fetch("https://dummyjson.com/todos");
        let json = await response.json();
        dataArr = json.todos;
    }
    
    dataNew={
        id:dataArr.length+1,
        todo:desc.value,
        userId:userId.value,
        completed:status1.value.toLowerCase() === 'completed' ? 'completed' : 'pending'
    }

    dataArr.push(dataNew);
    localStorage.setItem('array',JSON.stringify(dataArr))
    /* console.log(dataArr) */
    console.log(dataArr.length);
    showData();
    /* To clear inputs */
    /* TODO: create function to clear the values */
    desc.value = '';
    userId.value = '';
    status1.value = '';
}

/* TODO: keep the element declaration in on place it the top of the file */
let search = document.querySelector('.search');

search.oninput = () => {
    showData(search.value);
}

const showData = async (searchValue = '') => {
    if (localStorage.getItem('array') != null) {
        dataArr = JSON.parse(localStorage.getItem('array'));
    } else {
        let response = await fetch("https://dummyjson.com/todos");
        let json = await response.json();
        dataArr = json.todos;
    }

    /* TODO: make it const */
    let filteredData = dataArr.filter(item =>
        item.todo.toLowerCase().includes(searchValue.toLowerCase())
    );

    let table = "";
    filteredData.forEach((element) => {
        /* TODO: No need to do this line 
            <td>${element.completed === "completed" ? "Completed" : "Pending"}</td>
            since when you store the data you already do this check in line 30 you just need to get the value
            <td>${element.completed}</td>
         */
        table += `
            <tr>
                <td>${element.id}</td>
                <td>${element.todo}</td>
                <td>${element.userId}</td>
                <td>${element.completed === "completed" ? "Completed" : "Pending"}</td>
                <td><button onclick="deleteData(${element.id})" style="
                    background-color: rgb(236, 203, 203);
                    color: black;
                    border-radius:4px;
                    padding: 5px;
                ">delete</button></td>
                <td><button onclick="markAsDone(${element.id})" style="
                    background-color: rgb(180, 241, 180);
                    color: black;
                    border-radius:4px;
                    padding: 5px;
                ">Done</button></td>
            </tr>
        `;
    });

    document.getElementById("tbody").innerHTML = table;
    document.getElementById('count').innerHTML = `Total Tasks : ${filteredData.length}`;
}

showData();

/* TODO: convert all function to arrow function */

function deleteData(i){
    dataArr=dataArr.filter(item => item.id !== i);
    localStorage.setItem("array",JSON.stringify(dataArr));
    showData();
}


function markAsDone(id) {
    /* TODO-Bouns: convert the code from line 112 to 118 to be in one line (Note: The Bouns without money hhh) */
    dataArr = dataArr.map(item => {
        if (item.id === id) {
            /* TODO: don't use other language than English hhh */
            return { ...item, completed: 'completed' }; // تغيير الحالة إلى "completed"
        }
        return item;
    });
    localStorage.setItem("array", JSON.stringify(dataArr));
    showData();
}
