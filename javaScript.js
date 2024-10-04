
let desc =document.getElementById('desc');
let userId =document.getElementById('userId');
let status1 =document.getElementById('status1');
let btn=document.getElementById('btn');

let dataArr ;
/* console.log(desc,userId,status1); */
btn.onclick=async()=> {
    
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
    desc.value = '';
    userId.value = '';
    status1.value = '';
}

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

    let filteredData = dataArr.filter(item =>
        item.todo.toLowerCase().includes(searchValue.toLowerCase())
    );

    let table = "";
    filteredData.forEach((element) => {
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

function deleteData(i){
    dataArr=dataArr.filter(item => item.id !== i);
    localStorage.setItem("array",JSON.stringify(dataArr));
    showData();
}



function markAsDone(id) {
    dataArr = dataArr.map(item => {
        if (item.id === id) {
            return { ...item, completed: 'completed' }; // تغيير الحالة إلى "completed"
        }
        return item;
    });
    localStorage.setItem("array", JSON.stringify(dataArr));
    showData();
}