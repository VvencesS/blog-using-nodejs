const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty('_sort')) {
      const isValidType = ['asc', 'desc'].includes(req.query.type);
      courseQuery = courseQuery.sort({
        [req.query.column]: isValidType ? req.query.type : 'desc',
      });
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deleteCount]) =>
        res.render('me/stored-courses', {
          deleteCount,
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render('me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch(next);
  }
}

module.exports = new MeController();
