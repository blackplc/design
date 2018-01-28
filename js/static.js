let constant = function () {
    "use strict"
    let constant = {};
    constant.problemTypes = [
        {
            name:'判断题',
            no:1
        },{
            name:'选择题',
            no:2
        },{
            name:'填空题',
            no:3
        },{
            name:'改错题',
            no:4
        },{
            name:'编程题',
            no:5
        }
    ]
    return constant;
}()