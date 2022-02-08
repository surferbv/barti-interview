

function getAllPatients(){
    return fetch('https://6195803474c1bd00176c6d9a.mockapi.io/api/v1/patient')
            .then(res => res.json())
            .then((results) => {
                console.log("getAllPatients sucess retreiving patient data.");
                return results
            }, (error) => {
                console.log("getAllPatients error retriving patient data.");
                console.log(error);
            })
}

export default getAllPatients;
