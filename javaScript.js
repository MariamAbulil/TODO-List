const desc = document.getElementById('desc');
const userId = document.getElementById('userId');
const status1 = document.getElementById('status1');
const btn = document.getElementById('btn');
const search = document.querySelector('.search');

let dataArr;

const returnData = async () => {
    if (localStorage.array != null) {
        dataArr = JSON.parse(localStorage.getItem("array"));
    } else {
        const response = await fetch("https://dummyjson.com/todos");
        const json = await response.json();
        dataArr = json.todos;
    }
    return dataArr;
}

const clearData = () => {
    desc.value = '';
    userId.value = '';
    status1.value = '';
}

btn.onclick = async () => {
    await returnData();
    const dataNew = {
        id: dataArr.length + 1,
        todo: desc.value,
        userId: userId.value,
        completed: status1.value.toLowerCase() === 'completed' ? 'completed' : 'pending'
    }
    dataArr.push(dataNew);
    localStorage.setItem('array', JSON.stringify(dataArr));
    console.log(dataArr.length);
    showData();
    clearData();
}

search.oninput = () => {
    showData(search.value);
}

const showData = async (searchValue = '') => {
    await returnData();
    const filteredData = dataArr.filter(item =>
        item.todo.toLowerCase().includes(searchValue.toLowerCase())
    );

    let table = "";
    filteredData.forEach((element) => {
        table += `
            <tr>
                <td>${element.id}</td>
                <td>${element.todo}</td>
                <td>${element.userId}</td>
                <td>${element.completed}</td>
                <td><button onclick="deleteData(${element.id})" style="background-color: rgb(236, 203, 203); color: black; border-radius:4px; padding: 5px;">delete</button></td>
                <td><button onclick="markAsDone(${element.id})" style="background-color: rgb(180, 241, 180); color: black; border-radius:4px; padding: 5px;">Done</button></td>
            </tr>
        `;
    });
//new
    document.getElementById("tbody").innerHTML = table;
    document.getElementById('count').innerHTML = `Total Tasks : ${filteredData.length}`;
}

showData();

const deleteData = (i) => {
    dataArr = dataArr.filter(item => item.id !== i);
    localStorage.setItem("array", JSON.stringify(dataArr));
    showData();
}

const markAsDone = (id) => {
    dataArr = dataArr.map(item => (item.id === id ? { ...item, completed: 'completed' } : item));
    localStorage.setItem("array", JSON.stringify(dataArr));
    showData();
}