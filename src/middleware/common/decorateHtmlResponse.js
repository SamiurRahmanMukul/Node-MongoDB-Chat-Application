function decorateHtmlResponse(page_title) {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${process.env.APP_NAME} / ${page_title}`;
    res.locals.loggedInUser = {};
    res.locals.errors = {};
    res.locals.data = {};
    next();
  };
}

module.exports = decorateHtmlResponse;
