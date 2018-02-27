let constant = function () {
    "use strict"
    let constant = {};

    constant.pictureBaseUrl = 'http://localhost/image/'
    constant.pageSize = 15;

    constant.fliter = {};

    constant.baseUrl = '/graduationProject';
    constant.problemDic = '/problemDic';
    constant.picture = '/picture';
    // constant.picUploadUrl = '/problemDic/newPicture';

    constant.goto_view = function (v) {
        let baseUrl = window.location.href;
        //window.location.reload();
        baseUrl = (baseUrl.indexOf('#') > 0 ? baseUrl.substr(0, baseUrl.indexOf('#')) : baseUrl);
        window.location.href = baseUrl + "#!/" + v;
        return {'a': 1, b: 2};
    }

    constant.problemTemplate = function () {
        return {
            title: null,
            problemType: null,
            courseNo: null,
            category: null,
            description: null,
            standardAnswer: null,
            rightOption: null,
            pictureList: null,
            blankAmount: null,
            codeContent: null,
            errorContent: null,
            inputDes: null,
            outputDes: null
        }
    }

    constant.judgeProblemModal = function () {
        return {
            title: 'JudgeProblemTitle',
            description: 'JP\n选择是否正确\n     dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            inputDes: null,
            outputDes: null,
            input: null,
            output: null,
            blankAmount: null,
            problemType: 1,
            totalSunmit: Math.ceil(Math.random() * 50) + 20,
            passAmount: Math.ceil(Math.random() * 20),
            submitState: Math.ceil(Math.random() * 3),
        }
    };

    constant.chooseProblemModal = function () {
        return {
            title: 'ChooseProblem',
            description: 'CP\n选择正确选项\n     dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            inputDes: null,
            outputDes: null,
            input: null,
            output: null,
            blankAmount: 4,
            problemType: 2,
            totalSunmit: Math.ceil(Math.random() * 50) + 20,
            passAmount: Math.ceil(Math.random() * 20),
            submitState: Math.ceil(Math.random() * 3),
        }
    };

    constant.fillingProblemModal = function () {
        return {
            title: 'FillingProblemTitle',
            description: 'FP\n填写空缺的代码\n     dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            inputDes: 'filling input',
            outputDes: 'filling output',
            input: 1,
            output: 2,
            blankAmount: 2,
            problemType: 3,
            totalSunmit: Math.ceil(Math.random() * 50) + 20,
            passAmount: Math.ceil(Math.random() * 20),
            submitState: Math.ceil(Math.random() * 3),
        }
    };

    constant.correctingProblemModal = function () {
        return {
            title: 'CorrectingProblemTitle',
            description: 'CP\n修改错误的代码\n     dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            inputDes: 'correcting input',
            outputDes: 'correcting output',
            input: 1,
            output: 2,
            blankAmount: 3,
            problemType: 4,
            totalSunmit: Math.ceil(Math.random() * 50) + 20,
            passAmount: Math.ceil(Math.random() * 20),
            submitState: Math.ceil(Math.random() * 3),
        }
    };

    constant.programmingProblemModal = function () {
        return {
            title: 'ProgrammingProblemTitle',
            description: 'PP\n  提交完整的代码\n     dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            inputDes: 'programming input',
            outputDes: 'programming output',
            input: 1,
            output: 2,
            blankAmount: null,
            problemType: 5,
            totalSunmit: Math.ceil(Math.random() * 50) + 20,
            passAmount: Math.ceil(Math.random() * 20),
            submitState: Math.ceil(Math.random() * 3),
        }
    };

    constant.problemTypes = [
        {
            name: '判断题',
            no: 1
        }, {
            name: '选择题',
            no: 2
        }, {
            name: '填空题',
            no: 3
        }, {
            name: '改错题',
            no: 4
        }, {
            name: '编程题',
            no: 5
        }
    ]

    constant.numToCharacterArray = function (num) {
        return 'ABCDEFG'.slice(0, num).split('');
    }

    constant.numToNumArray = function (num) {
        return [0, 1, 2, 3, 4, 5, 6].slice(0, num);
    }

    constant.back = function () {
        setTimeout(function () {
            history.back();
        }, 500);
    }

    constant.fliter.homeworkState = function (num) {
        if (num === 0) {
            return '未开始';
        } else if (num === 1) {
            return '进行中';
        } else if (num === 2) {
            return '已结束';
        }
    }
    constant.fliter.problemType = function (num) {
        for (let i in constant.problemTypes) {
            if (parseInt(i) + 1 === num) {
                return constant.problemTypes[i].name;
            }
        }
        // angular.forEach(constant.problemTypes, function(data){
        //     if(data.no === num){
        //         return data.name;
        //     }
        // });
    }
    constant.timeToHMS = function (time) {
        time = parseInt(time / 1000)
        let hour = parseInt(time / 60 / 60);
        let minute = parseInt((time - hour * 60 * 60) / 60);
        let second = parseInt(time % 60);
        return hour + '小时' + minute + '分钟' + second + '秒';
    }
    return constant;
}()