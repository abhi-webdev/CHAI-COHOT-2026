const fs = require('fs');
const filePath = './tasks.json'


const loadTasks = (task) => {
    try {
        const dataBuffer = fs.readFileSync(filePath)
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
} 

const addTask = (task) => {
    const tasks = loadTasks()
    tasks.push({task});
    saveTask(tasks);
    console.log('Task added', task);
    
} 

const saveTask = (tasks) => {
    const dataJSON = JSON.stringify(tasks)
    fs.writeFileSync(filePath, dataJSON);
}

const listTasks = () => {
    const tasks = loadTasks();
    tasks.forEach((ele, index) => {
        console.log(`${ele.task} - ${index+1}`);
    });x
}

const command = process.argv[2]
const argument = process.argv[3]

if(command === 'add'){
    addTask(argument)
}else if(command === 'list'){
    listTasks()
}else if(command === 'remove'){
    removeTask(parseInt(argument))
}else {
    console.log("Invalid command");
}