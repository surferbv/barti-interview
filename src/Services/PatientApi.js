

function getAllPatients(){
    return fetch('https://6195803474c1bd00176c6d9a.mockapi.io/api/v1/patient').then(res => res.json())
}

export default getAllPatients;
