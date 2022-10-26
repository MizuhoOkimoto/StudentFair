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

router.route('/edit').get((req, res) => {
    Report.find({ report_number: req.body.report_number})
          .then((err, reports) =>{
            Report.updateOne(
                {
                    report_number: req.body.report_number
                }
            )
          })
});




module.exports = router;