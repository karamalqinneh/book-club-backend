"use strict";

const acl = (action) => {
  return (req, res, next) => {
    try {
      if (req.user.actions.includes(action)) {
        next();
      } else {
        next("access denied from ACL auth");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = acl;
