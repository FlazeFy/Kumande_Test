export const  generateAuthToken= (type) => {
    let res = ""

    if(type == "hardcode"){
        // email : flazen.edu@gmail.com,
        // password : nopass123
        // Signed in at 07/2/24 19:51 WIB
        res = "285|BMsYhez6WDc3YKXCOWxXxIL3dp5cEDuRshUHczUu"
    }

    return res
}

export const generateDatetimeStr = (min) => {
    let inputTs

    if (min && min.trim() !== "") {
        const inputDate = new Date(min)
    
        inputTs = inputDate.getTime()
    } else {
        inputTs = Date.now();
    }
  
    const currentTimestamp = Date.now()
    const randomTimestamp = Math.floor(Math.random() * (currentTimestamp - inputTs)) + inputTs
    const rand = new Date(randomTimestamp)

    const yr = rand.getFullYear()
    const mon = String(rand.getMonth() + 1).padStart(2, '0')
    const dy = String(rand.getDate()).padStart(2, '0')
    const hr = String(rand.getHours()).padStart(2, '0')
    const mi = String(rand.getMinutes()).padStart(2, '0')
  
    const res = `${yr}-${mon}-${dy} ${hr}:${mi}`;

    return res
}


export const  generateRandNumber= (max, min) => {
    const res = Math.floor(Math.random() * max) + min

    return res
}