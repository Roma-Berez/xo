let createGame = document.querySelector('.create-game')
let joinGame = document.querySelector('.join-game')
let getId = document.querySelector('.get-id')




async function getIdGame() {
    let response = await fetch('/get-new-id-game')
    let json = await response.json()
    return json.id;
}

createGame.addEventListener('click', async function(){
    const idGame = await getIdGame()
    //location.href = '/game/' +idGame + '/x'

    let a = document.createElement("a");
    a.target = "_blank";
    a.href = '/game/' +idGame + '/x';
    a.click();
})
joinGame.addEventListener('click', function(){
    
    if (getId.value == ''){
        alert('There are no games with that id!')
        return false
    } else{
        if (checkIfCorrectId(getId.value)) {
             let a = document.createElement("a");
             a.target = "_blank";
             a.href = "/game/" + getId.value + "/o";
             a.click();
        }
    }
})


function checkIfCorrectId (id) {

    return true;
    return false;

}