export default function validate (prop, value){
    if(prop === 'name'){
        if(value === '') return "Name can't be empty"
        else return ''  
    }
    if(prop === 'rating'){
        const numero = +value
        if(isNaN(numero)) return 'Rating must be a valid number'
        else if( numero < 0 || numero > 5) return "Number has to be between 0-5"
        else return ""
    }
    if(prop === 'description'){
        if(value === '') return "Description can't be empty";
    }
    if(prop === 'released') {
        
        const regex = /^\d{4}-\d{2}-\d{2}$/
        
        if(value === '') return "Realeased data can't be empty";
        else {
            const date = value.split('-');
            const year = parseInt(date[0]);
            const month = parseInt(date[1]);
            const day = parseInt(date[2]);

            const isValidYear = year >= 0 && year <= 9999;
            const isValidMonth = month >= 1 && month <= 12;
            const daysInMonth = new Date(year, month, 0).getDate();
            const isValidDay = day >= 1 && day <= daysInMonth;

            if(isValidDay && isValidMonth && isValidYear && regex.test(value)) return ""
            else return `Invalid Date or format "YYYY/MM/DD"`
        }
        
    }
    else return ""
}