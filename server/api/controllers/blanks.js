const mongoose = require("mongoose");

const Blank = require("../models/blank");

exports.blanks_get_all = (req, res, next) => {
    Blank.find()
    .populate("advisor", "name _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        blanks: docs.map(doc => {
          return {
            type: doc.type,
            number: doc.number,
            dateAdded: doc.dateAdded,
            advisor: doc.advisor,
            dateAssigned: doc.dateAssigned,
            coupons: doc.coupons,
            _id: doc._id,
            used: doc.used
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving blanks(Server)"
      });
    });
}
exports.blanks_create_blank = (req, res, next) => {
    const blank = new Blank({
        _id: new mongoose.Types.ObjectId(),
        uniqueNumber: req.body.uniqueNumber,
        dateAdded: req.body.dateAdded,
        advisor: req.body.advisor,
        dateAssigned: req.body.dateAssigned,
        coupons: req.body.coupons
    });
    blank
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created blank successfully",
            createdProduct: {
              type: result.type,
              number: result.number,
              _id: result._id
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "Error creating blank(Server)"
          });
        });
}
exports.blanks_get_blank = (req, res, next) => {
    const id = req.params.blankId;
    Blank.findById(id)
      .select("type number uniqueNumber dateAdded advisor dateAssigned coupons")
      .populate("advisor", "name")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            product: doc
          });
        } else {
          res
            .status(404)
            .json({ message: `No valid entry found for provided number` });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error retrieving blank(Server)" });
      });
}

exports.blanks_get_blank_by_uniqueNo = (req, res, next) => {
  const id = req.params.blankId;
  Blank.findOne({uniqueNumber: id})
    .select("type number uniqueNumber dateAdded advisor dateAssigned coupons used")
    .populate("advisor", "name")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          blank: doc
        });
      } else {
        res
          .status(404)
          .json({ message: `No valid entry found for provided number ${req.params.blankId}` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving blank(Server)" });
    });
}

exports.blanks_update_blank = (req, res, next) => {
  const blankNo = req.params.blankUniqueNumber;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Blank.update({ uniqueNumber: blankNo }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Blank updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error updating blank(Server)"
      });
    });
}
exports.blanks_delete_blank = (req, res, next) => {
  const id = req.params.blankId;
  Blank.findOne({ _id: id })
  .exec()
  .then(blank => {
    if(blank.used){
      return res.status(500).json({
        message: `Cannot remove used blank: ${blank.uniqueNumber}`
      })
    } else {
      Blank.remove({_id: blank._id}).exec().then(result => {
        res.status(200).json({
        message: "Blank deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });  
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}
exports.blanks_delete_blank_by_number = (req, res, next) => {
  const un = req.params.uniqueNumber
  Blank.findOne({ uniqueNumber: un })
  .exec()
  .then(blank => {
    if(blank.used){
      return res.status(500).json({
        message: `Cannot remove used blank: ${blank.uniqueNumber}`
      })
    } else {
      Blank.remove({_id: blank._id}).exec().then(result => {
        res.status(200).json({
        message: "Blank deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });  
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}