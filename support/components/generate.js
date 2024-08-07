export const  generateAuthToken= (type) => {
    let res = ""

    if(type == "hardcode"){
        // email : flazen.edu@gmail.com,
        // password : nopass123
        // Signed in at 05/7/24 23:12 WIB
        res = "465|G9cLxsFBMzw0MgkI6eAByxmRHDoKNTlhj1wYLtg44d8e8884"
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

export const generateRandDate = () => {
    const start = new Date('2020-01-01T00:00:00').getTime()
    const end = new Date().getTime()
    let res = Math.floor(Math.random() * (end - start + 1)) + start
    res = new Date(res)
    console.log(res)

    return res
}

export const generateDayName = (date) => {
    const daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayIdx = date.getDay()
    const res = daysName[dayIdx]

    return res
}

export const generateMonthName = (idx, type) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];    
    let res = null 
    if(idx != 'all'){
        if(type == 'full'){
            res = monthNames[idx]
        } else if(type == 'short'){
            res = monthNames[idx].substring(0,3)
        }
    } else {
        if(type == 'full'){
            res = monthNames
        } else {
            res = monthNames.map(name => name.substring(0, 3));
        }
    }
    return res
}

export const  generateRandNumber= (max, min) => {
    const res = Math.floor(Math.random() * max) + min

    return res
}