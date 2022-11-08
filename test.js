let obj = [
    { id: 1, colors: [{id:1, color: 'Blue'}, {id:3,color: 'Red'}] }, 
    { id: 2, colors: [{id:1, color: 'Blue'}, {id:2,color: 'Yellow'}, {id:3,color: 'Red'}] }, 
    { id: 3, colors: [{id:3,color: 'Red'}, {id:4,color: 'Green'}] }
]
let new_ = obj.filter(x => x.colors.includes({id:1, color: 'Blue'}))
console.log(new_)