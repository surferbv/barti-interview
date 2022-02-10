

function getPatients(props){

    console.log(props);

    return fetch('https://6195803474c1bd00176c6d9a.mockapi.io/api/v1/patient')
            .then( res => res.json() )
            .then( (results) => {
                console.log("getPatients api sucess retreiving patient data.");
                return results
            }, (error) => {
                console.log("getPatients api error retriving patient data.");
                console.log(error);
            })
}

export default getPatients;
