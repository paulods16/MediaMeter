const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = express.Router();
const moment = require("moment");

const mssql = require('mssql')

const myDatabase = {
  user: 'sa',
  password: '81at84',
  server: 'sql_training',
  database: 'PAULO',
  options: {
    encrypt: false
  }
}

router.use(cors()) 
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
 
// -------------------------------------------------------------
 
// router.get('/', (req, res) => {
//   res.send('Hello world!')
// })
 
//GET HOME DATA
router.get("/getAllData", (req, res) => {
  let sql = `SELECT * FROM UsersTable WHERE DeletedDate IS NULL ORDER BY CreatedDate DESC`;

  mssql.connect(myDatabase, function (err) {
    if (err) {
      console.error(err);
    }

    var request = new mssql.Request();

    request.query(sql, function (err, recordset) {
      if (err) {
        console.error(err);
        mssql.close();
      }else{
        res.send(recordset.recordset);
        mssql.close();
      }
    });
  });
});

// GET DELETED DATA
router.get("/getToRestoreData", (req, res) => {
  let sql = `SELECT * FROM UsersTable WHERE DeletedDate IS NOT NULL ORDER BY DeletedDate DESC`;

  mssql.connect(myDatabase, function (err) {
    if (err) {
      console.error(err);
    }

    var request = new mssql.Request();

    request.query(sql, function (err, recordset) {
      if (err) {
        console.error(err);
        mssql.close();
      }else{
        res.send(recordset.recordset);
        mssql.close();
      }
    });
  });
});

//INSERT
router.post("/insertUser", (req, res) => {
  // console.log(req.body);

  let sql = `
    INSERT INTO UsersTable
    (
      UserCode,
      Firstname,
      Lastname,
      AccountType,
      Username,
      Password,
      PhysicalAddress,
      CreatedDate,
      DeletedDate,
      UpdatedDate,
      UpdatedBy
    )
    VALUES
    (
      '${req.body.UserCode}',
      '${req.body.Firstname}',
      '${req.body.Lastname}',
      '${req.body.AccountType}',
      '${req.body.Username}',
      '${req.body.Password}',
      '${req.body.PhysicalAddress}',
      getDate(),
      NULL,
      NULL,
      '${req.body.UpdatedBy}'
    )
  `;

  mssql.connect(myDatabase, function (err) {

    if (err) {
      console.log(err);
    }

    var request = new mssql.Request();
    request.query(sql, function (error, recordset) {
      if (error) {
        console.log(error);
      }else{
        res.send("Saved!");
      }
    });
  });
});


//UPDATE
router.post("/updateUserInfo", (req, res) => {

  let sql = `
    UPDATE UsersTable
    SET  
    Firstname = '${req.body.Firstname}',  
    Lastname =  '${req.body.Lastname}',  
    AccountType = '${req.body.AccountType}',  
    Username = '${req.body.Username}',  
    Password = '${req.body.Password}',  
    PhysicalAddress = '${req.body.PhysicalAddress}',
    UpdatedBy = '${req.body.UpdatedBy}',
    UpdatedDate = getdate()
    WHERE UserCode = '${req.body.UserCode}'
  `;

  mssql.connect(myDatabase, function (err) {
    if (err) {
      console.log(err);
    }

    var request = new mssql.Request();
    request.query(sql, function (error, recordset) {
      if (error) {
        console.log(error);
      }else{
        res.send("Updated!");
      }
    });
  });
});

//RESTORE
router.post("single_restore", (req, res) => {

  let sql = `
    UPDATE UsersTable
    SET  
    Firstname = '${req.body.Firstname}',  
    Lastname =  '${req.body.Lastname}',  
    AccountType = '${req.body.AccountType}',  
    Username = '${req.body.Username}',  
    Password = '${req.body.Password}', 
    UpdatedBy = '${req.body.UpdatedBy}', 
    DeletedDate = NULL,
    PhysicalAddress = '${req.body.PhysicalAddress}',
    WHERE UserCode = '${req.body.UserCode}'
  `;

  mssql.connect(myDatabase, function (err) {
    if (err) {
      console.log(err);
    }

    var request = new mssql.Request();
    request.query(sql, function (error, recordset) {
      if (error) {
        console.log(error);
      }else{
        res.send("Updated!");
      }
    });
  });
});

//SOFT DELETE
router.post("DeleteData", (req, res) => {

  let sql = `
    UPDATE UsersTable
    SET  
    Firstname = '${req.body.Firstname}',  
    Lastname =  '${req.body.Lastname}',  
    AccountType = '${req.body.AccountType}',  
    Username = '${req.body.Username}',  
    Password = '${req.body.Password}',  
    PhysicalAddress = '${req.body.PhysicalAddress}',
    UpdatedBy = '${req.body.UpdatedBy}',
    DeleteReason = '${req.body.DeleteReason}',
    DeletedDate = getdate()
    WHERE UserCode = '${req.body.UserCode}'
  `;

  mssql.connect(myDatabase, function (err) {
    if (err) {
      console.log(err);
    }

    var request = new mssql.Request();
    request.query(sql, function (error, recordset) {
      if (error) {
        console.log(error);
      }else{
        res.send("Updated!");
      }
    });
  });
});






 
module.exports = router;