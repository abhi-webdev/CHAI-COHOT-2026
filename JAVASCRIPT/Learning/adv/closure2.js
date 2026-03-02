function etrnal(guest){
    const gname = guest;
    function zomato(){
        console.log(`Hi, ${gname} from Zomato`);
    }
    
    function blinkit(){
        console.log(`Hi, ${gname} from Blinkit`);
    }

    return {
        zomato,
        blinkit
    }
}

const hitesh = etrnal("Hitesh")
const piyush = etrnal("Piyush")

hitesh.blinkit()
piyush.zomato()