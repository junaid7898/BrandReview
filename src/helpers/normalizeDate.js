export const normalizeDate = (date) => {

    const newDate = new Date(date)
    let day = ""
    switch(newDate.getDay()){
        case 1:
            day = "	pazartesi"
            break;
        case 2:
            day = "salı "
            break;
        case 3:
            day = "çarşamba "
            break;
        case 4:
            day = "perşembe "
            break;
        case 5:
            day = "	cumā "
            break;
        case 6:
            day = "cumartesi"
            break;
        case 7:
            day = "pazar"
            break;       
        default:{
            throw new Error("Invalid Date Formate")
            return   
        }
    }



    let month = ""


    switch(newDate.getMonth()){
        case 1:
            month = "ocak"
            break;
        case 2:
            month = "şubat "
            break;
        case 3:
            month = "mart "
            break;
        case 4:
            month = "nīsan "
            break;
        case 5:
            month = "mayıs "
            break;
        case 6:
            month = "hazīran "
            break;
        case 7:
            month = "temmuz "
            break;
        case 8:
            month = "ağustos "
            break;   
        case 9:
            month = "eylül"
            break;   
        case 10:
            month = "ekim"
            break; 
        case 11:
            month = "kasım"
            break; 
        case 12:
            month = "aralık"
            break; 
        default:
            throw new Error("Invalid Date Formate")
            break;       
    }

    const iso = newDate.toISOString()


    const onlyDate = iso.split("T")[0]


     const j = onlyDate.split("-")

     const Date1 = j[2]
        const year = j[0]


    console.error(Date1, year);

    // console.error();
    day = day.charAt(0).toUpperCase() + day.slice(1)
    month = month.charAt(0).toUpperCase() + month.slice(1)
    const finalDate = day + " " + month + ' ' + Date1 + ' ' + year
    
    
    return finalDate

} 