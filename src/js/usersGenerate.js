export let randomNum = Math.floor(Math.random() * 6) + 1;

export const userName = async() => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        let users;
        return users = await response.json();
}



export const userAvatar = (randomNum) => {
    const mainDiv = document.getElementById('menu')
    const div = document.createElement('div');
    div.className = 'item';

    let divAtr = document.createAttribute('data-value');
    div.setAttributeNode(divAtr);

    const todoImg = document.createElement("img");
    todoImg.className = "ui mini avatar image";

    let imgAtr = document.createAttribute('src');
    imgAtr.value = `https://avatars.dicebear.com/api/bottts/${randomNum}.svg`;
    todoImg.setAttributeNode(imgAtr);

    div.append(todoImg)
    mainDiv.append(div);

    return div
}
