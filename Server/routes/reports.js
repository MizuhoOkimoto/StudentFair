const path = require('path');
const router = require('express').Router();

let Report = require('../module/report_schema');

var reports = [];

router.route('/').get((req, res) => {
    Report.find()
        .then((report) => {
            report = report.map((value) => value.toObject());
            reports = report;
            global.reports = reports;
            console.log(reports);
            res.json(reports);
        })
        .catch((err) => 
                    res.status(400).json('Error : ' + err));
});

router.route('/detail/:report_number')
      .get((req, res) =>{
        var index = req.params.report_number;
        let curReport = reports[index];
        res.render('reports/detail', {
            report: curReport
        });
});

router.route('/create_report').post((req, res) => {

    const { email, category, title, description, date } = req.body;
    
    console.log(reports.length);
    
    const newReport = new Report({        
      report_number: reports.length + 1, 
      user_id: email,
      category: category,
      title: title,
      description: description,
      date: date,
    });

    newReport.save().then(() =>{
        reports.push(newReport);
        res.send(true);

        }).catch((err) => res.status(400).json('Error: ' + err));
    console.log(newReport);   
});




module.exports = router;