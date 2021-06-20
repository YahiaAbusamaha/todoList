async function getData() {

    const response = await fetch(url());
    const inputData = await response.json();

    const container = document.querySelector('.container');

    const show = inputData.filter((e) => { return e.isDeleted === false })

    if (show.length === 0) {
        divStyle(container);
    }

    for (let i = 0; i < inputData.length; i++) {
        let theItem = document.createElement('div');
        container.appendChild(theItem);

        if (inputData[i].isDeleted === false) {
            const documents = document.createElement('form');
            const result = '<div class="content">' + '<div class="paragraph">' + '<p>' + '<b>' + inputData[i].data + '</b>' + '</p>' + '</div>' + `<input type='button' id='${inputData[i].id}' value='Delete' name='${inputData[i].data}' class='deleteBtn' onclick='deleteData(this)'>` + '</div>';
            documents.innerHTML = result;
            theItem.append(documents);
        }

    }
}

async function deleteData(data) {

    const Http = new XMLHttpRequest();
    Http.open('PUT', url());
    Http.setRequestHeader('Content-Type', 'application/json');
    Http.send(JSON.stringify({

        "data": data.name,
        "isDeleted": true,
        "id": data.id
    }));

    location.reload()
}

async function addData() {

    const myInput = document.getElementById('myInput').value;
    const Http = new XMLHttpRequest();
    Http.open('POST', url());
    Http.setRequestHeader('Content-Type', 'application/json');
    Http.send(JSON.stringify({

        'data': myInput,
    }));

    location.reload()
}

document.addEventListener('DOMContentLoaded', () => {

    getData();
})

function url() {

    return 'http://localhost:3000/api/toDoLists?access_token=WYtT8dpgu3eklJ2LScvTDYiWrM3BHGoMQkn0sElUAbSZtpI8ksvgjM4uqPWWkKtd';
}

function divStyle(div) {

    div.style.border = "none";
    div.innerHTML = "This area is empty";
    div.style.fontSize = "x-large";
    div.style.textAlign = "center";
}